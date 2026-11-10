/* ==========================================================
   LocaONG: lógica do site integrada ao Supabase
   ========================================================== */

// SUAS CREDENCIAIS DO SUPABASE:
const SUPABASE_URL = 'https://zcxmkfehmxcolfmhhtun.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qMMe-5-wEOYd8mU6FkZTmQ_8g0vQuuL';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CAUSAS = {
  animais: "Animais",
  educacao: "Crianças e educação",
  ambiente: "Meio ambiente",
  alimentacao: "Alimentação",
  saude: "Saúde",
  moradia: "Moradia",
  mulheres: "Mulheres",
  idosos: "Pessoas idosas",
};

// Variável global que receberá as ONGs vindas do banco de dados
let ONGS = [];

/* ---------- Elementos da página ---------- */
const formBusca = document.getElementById("form-busca");
const campoTexto = document.getElementById("campo-texto");
const campoCausa = document.getElementById("campo-causa");
const listaOngs = document.getElementById("lista-ongs");
const tituloOngs = document.getElementById("titulo-ongs");
const blocoVazio = document.getElementById("vazio");
const botaoLimpar = document.getElementById("botao-limpar");
const gradeCausas = document.getElementById("grade-causas");
const botoesCidades = document.getElementById("botoes-cidades");
const secaoOngs = document.getElementById("ongs");
const janela = document.getElementById("detalhes");
const botaoCopiar = document.getElementById("detalhes-copiar");
const formCadastro = document.getElementById("form-cadastro");

const modeloCard = document.getElementById("modelo-card");
const modeloContato = document.getElementById("modelo-contato");

/* ---------- Funções de apoio ---------- */

function normalizar(texto) {
  if (!texto) return "";
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function somenteDigitos(texto) {
  if (!texto) return "";
  return texto.replace(/\D/g, "");
}

function linkTelefone(numero) {
  return "tel:+55" + somenteDigitos(numero);
}

function linkWhatsapp(numero) {
  return "https://wa.me/55" + somenteDigitos(numero);
}

function iconeDaCausa(causa) {
  return "#icone-" + (causa || "animais");
}

/* ---------- Busca no Front-end ---------- */

function buscarOngs() {
  const texto = normalizar(campoTexto.value);
  const causa = campoCausa.value;

  return ONGS.filter(function (ong) {
    const nome = ong.nome || "";
    const cidade = ong.cidade || "";
    const uf = ong.uf || "";
    const ondeProcurar = normalizar(nome + " " + cidade + " " + uf);
    return ondeProcurar.includes(texto) && (causa === "" || ong.causa === causa);
  });
}

function atualizarPagina() {
  const encontradas = buscarOngs();
  const temFiltro = campoTexto.value.trim() !== "" || campoCausa.value !== "";

  listaOngs.replaceChildren(...encontradas.map(criarCard));
  blocoVazio.hidden = encontradas.length > 0;
  botaoLimpar.hidden = !temFiltro;

  if (!temFiltro) {
    tituloOngs.textContent = "Todas as ONGs";
  } else if (encontradas.length === 1) {
    tituloOngs.textContent = "1 ONG encontrada";
  } else {
    tituloOngs.textContent = encontradas.length + " ONGs encontradas";
  }

  gradeCausas.querySelectorAll(".causa").forEach(function (botao) {
    botao.setAttribute("aria-pressed", String(botao.dataset.causa === campoCausa.value));
  });
}

function irParaResultados() {
  secaoOngs.scrollIntoView();
}

/* ---------- Montagem dos cards ---------- */

function criarCard(ong) {
  const card = modeloCard.content.cloneNode(true);

  card.querySelector(".ong-icone use").setAttribute("href", iconeDaCausa(ong.causa));
  card.querySelector(".card-nome").textContent = ong.nome;
  card.querySelector(".card-causa").textContent = CAUSAS[ong.causa] || ong.causa;
  card.querySelector(".card-local").textContent = (ong.cidade || "") + ", " + (ong.uf || "");
  card.querySelector(".card-desc").textContent = ong.descricao || "";

  const telefone = card.querySelector(".card-telefone");
  if (ong.telefone) {
    telefone.href = linkTelefone(ong.telefone);
    telefone.setAttribute("aria-label", "Ligar para " + ong.nome + ": " + ong.telefone);
    telefone.querySelector("span").textContent = ong.telefone;
  } else {
    telefone.remove();
  }

  const whatsapp = card.querySelector(".card-whatsapp");
  if (ong.whatsapp) {
    whatsapp.href = linkWhatsapp(ong.whatsapp);
    whatsapp.setAttribute("aria-label", "WhatsApp de " + ong.nome);
  } else {
    whatsapp.remove();
  }

  const detalhes = card.querySelector(".card-detalhes");
  detalhes.setAttribute("aria-label", "Ver contatos de " + ong.nome);
  detalhes.addEventListener("click", function () {
    abrirDetalhes(ong);
  });

  return card;
}

/* ---------- Janela de contatos ---------- */

function criarLinhaContato(icone, rotulo, valor, link) {
  const linha = modeloContato.content.cloneNode(true);
  linha.querySelector("use").setAttribute("href", "#icone-" + icone);
  linha.querySelector(".contato-rotulo").textContent = rotulo;

  const destino = linha.querySelector(".contato-valor");
  if (link) {
    const ancora = document.createElement("a");
    ancora.href = link;
    ancora.textContent = valor;
    if (link.startsWith("http")) {
      ancora.target = "_blank";
      ancora.rel = "noopener";
    }
    destino.append(ancora);
  } else {
    destino.textContent = valor;
  }
  return linha;
}

function abrirDetalhes(ong) {
  document.getElementById("detalhes-icone").setAttribute("href", iconeDaCausa(ong.causa));
  document.getElementById("detalhes-nome").textContent = ong.nome;
  document.getElementById("detalhes-subtitulo").textContent =
    (CAUSAS[ong.causa] || ong.causa) + " · " + (ong.cidade || "") + ", " + (ong.uf || "");
  document.getElementById("detalhes-desc").textContent = ong.descricao || "";
  
  const telLink = ong.telefone ? linkTelefone(ong.telefone) : "#";
  document.getElementById("detalhes-ligar").href = telLink;

  const linhas = [];
  if (ong.telefone) {
    linhas.push(criarLinhaContato("telefone", "Telefone", ong.telefone, linkTelefone(ong.telefone)));
  }
  if (ong.whatsapp) {
    linhas.push(criarLinhaContato("whatsapp", "WhatsApp", ong.whatsapp, linkWhatsapp(ong.whatsapp)));
  }
  if (ong.email) {
    linhas.push(criarLinhaContato("email", "E-mail", ong.email, "mailto:" + ong.email));
  }
  if (ong.site) {
    linhas.push(criarLinhaContato("site", "Site", ong.site.replace("https://", "").replace("http://", ""), ong.site));
  }
  if (ong.endereco) {
    linhas.push(criarLinhaContato("endereco", "Endereço", ong.endereco + " · " + (ong.cidade || "") + ", " + (ong.uf || "")));
  }
  if (ong.horario) {
    linhas.push(criarLinhaContato("horario", "Horário de atendimento", ong.horario));
  }
  
  document.getElementById("detalhes-contatos").replaceChildren(...linhas);

  botaoCopiar.textContent = "Copiar número";
  botaoCopiar.dataset.numero = ong.telefone || "";
  janela.showModal();
}

async function copiarNumero() {
  const numero = botaoCopiar.dataset.numero;
  if (!numero) return;

  try {
    await navigator.clipboard.writeText(numero);
  } catch (erro) {
    const campo = document.createElement("textarea");
    campo.value = numero;
    janela.append(campo);
    campo.select();
    document.execCommand("copy");
    campo.remove();
  }

  botaoCopiar.textContent = "Número copiado";
}

/* ---------- Preenchimento inicial das listas e filtros ---------- */

function montarCausas() {
  gradeCausas.innerHTML = "";
  Object.entries(CAUSAS).forEach(function ([chave, nome]) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "causa";
    botao.dataset.causa = chave;
    botao.setAttribute("aria-pressed", "false");
    botao.innerHTML = '<svg aria-hidden="true"><use href="' + iconeDaCausa(chave) + '"></use></svg>';
    botao.append(nome);
    botao.addEventListener("click", function () {
      campoCausa.value = campoCausa.value === chave ? "" : chave;
      atualizarPagina();
      irParaResultados();
    });
    gradeCausas.append(botao);
  });
}

function montarCidades() {
  const cidades = [...new Set(ONGS.map((ong) => ong.cidade).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const listaSugestoes = document.getElementById("lista-cidades");
  listaSugestoes.innerHTML = "";
  botoesCidades.innerHTML = "";

  cidades.forEach(function (cidade) {
    const sugestao = document.createElement("option");
    sugestao.value = cidade;
    listaSugestoes.append(sugestao);

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "link-cidade";
    botao.textContent = "ONGs em " + cidade;
    botao.addEventListener("click", function () {
      campoTexto.value = cidade;
      campoCausa.value = "";
      atualizarPagina();
      irParaResultados();
    });
    botoesCidades.append(botao);
  });
}

/* ---------- Comunicação com o Supabase (Carregar dados) ---------- */

async function inicializarApp() {
  try {
    const { data, error } = await supabaseClient
      .from('ongs_view')
      .select('*');

    if (error) {
      console.error('Erro ao buscar ONGs do Supabase:', error);
      return;
    }

    ONGS = data || [];

    montarCausas();
    montarCidades();
    atualizarPagina();

  } catch (err) {
    console.error('Erro de conexão:', err);
  }
}

/* ---------- Cadastro de nova ONG pelo Site ---------- */

if (formCadastro) {
  formCadastro.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const nome = document.getElementById('cad-nome').value.trim();
    const causaSlug = document.getElementById('cad-causa').value;
    const cidade = document.getElementById('cad-cidade').value.trim();
    const uf = document.getElementById('cad-uf').value.trim().toUpperCase();
    const telefone = document.getElementById('cad-telefone').value.trim();
    const whatsapp = document.getElementById('cad-whatsapp').value.trim();
    const email = document.getElementById('cad-email').value.trim();
    const site = document.getElementById('cad-site').value.trim();
    const endereco = document.getElementById('cad-endereco').value.trim();
    const descricao = document.getElementById('cad-descricao').value.trim();

    const slug = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
      // 1. Insere na tabela principal 'organizations'
      const { data: orgData, error: orgError } = await supabaseClient
        .from('organizations')
        .insert([
          {
            name: nome,
            slug: slug,
            description: descricao,
            contact_email: email,
            website_url: site,
            status: 'active',
            is_verified: true
          }
        ])
        .select()
        .single();

      if (orgError) {
        console.error('Erro na tabela organizations:', orgError);
        throw orgError;
      }
      const orgId = orgData.id;

      // 2. Insere a localização na tabela 'organization_locations'
      const { error: locError } = await supabaseClient
        .from('organization_locations')
        .insert([
          {
            organization_id: orgId,
            city: cidade,
            state: uf,
            address_line: endereco,
            phone: telefone,
            whatsapp: whatsapp,
            is_primary: true
          }
        ]);

      if (locError) {
        console.error('Erro na tabela organization_locations:', locError);
        throw locError;
      }

      // 3. Busca o ID da categoria correspondente e faz a relação
      const { data: catData, error: catError } = await supabaseClient
        .from('categories')
        .select('id')
        .eq('slug', causaSlug)
        .maybeSingle();

      if (catError) {
        console.error('Erro ao buscar categoria:', catError);
      }

      if (catData) {
        const { error: relError } = await supabaseClient
          .from('organization_categories')
          .insert([
            {
              organization_id: orgId,
              category_id: catData.id
            }
          ]);
        
        if (relError) {
          console.error('Erro na tabela organization_categories:', relError);
        }
      }

      alert('ONG cadastrada com sucesso!');
      formCadastro.reset();

      // Recarrega os dados e atualiza a listagem na tela
      await inicializarApp();
      secaoOngs.scrollIntoView();

    } catch (erro) {
      console.error('Erro geral ao cadastrar ONG:', erro);
      alert('Erro ao realizar o cadastro. Pressione F12 e olhe o Console para ver o detalhe do erro.');
    }
  });
}

/* ---------- Eventos gerais ---------- */

campoTexto.addEventListener("input", atualizarPagina);
campoCausa.addEventListener("change", atualizarPagina);

formBusca.addEventListener("submit", function (evento) {
  evento.preventDefault();
  atualizarPagina();
  irParaResultados();
});

botaoLimpar.addEventListener("click", function () {
  formBusca.reset();
  atualizarPagina();
});

botaoCopiar.addEventListener("click", copiarNumero);

janela.addEventListener("click", function (evento) {
  const area = janela.getBoundingClientRect();
  const clicouFora =
    evento.clientX < area.left ||
    evento.clientX > area.right ||
    evento.clientY < area.top ||
    evento.clientY > area.bottom;

  if (evento.target === janela && clicouFora) {
    janela.close();
  }
});

// Inicializa a aplicação buscando do banco
inicializarApp();