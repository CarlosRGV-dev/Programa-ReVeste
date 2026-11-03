/* ==========================================================
   LocaONG: lógica do site

   COMO TROCAR OS DADOS
   Edite a lista ONGS abaixo. Cada ONG é um bloco { ... }.
   - telefone e whatsapp: escreva com DDD, ex.: "(81) 3333-4444"
   - whatsapp, email, site e horario são opcionais: deixe "" se
     a ONG não tiver, e a linha não aparece no site.
   - causa: precisa ser uma das chaves da lista CAUSAS.

   Atenção: os dados abaixo são FICTÍCIOS. Os números começam
   com zero de propósito, para não ligar para ninguém.
   ========================================================== */

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

const ONGS = [
  {
    nome: "Patas Exemplo",
    causa: "animais",
    cidade: "São Paulo",
    uf: "SP",
    descricao: "Resgate e adoção de cães e gatos.",
    telefone: "(11) 0000-0001",
    whatsapp: "(11) 00000-0001",
    email: "contato@patas.example",
    site: "https://patas.example",
    endereco: "Rua Exemplo, 100, Centro",
    horario: "Seg. a sex., das 9h às 17h",
  },
  {
    nome: "Leitura Exemplo",
    causa: "educacao",
    cidade: "Belo Horizonte",
    uf: "MG",
    descricao: "Reforço escolar e clube de leitura para crianças.",
    telefone: "(31) 0000-0002",
    whatsapp: "(31) 00000-0002",
    email: "contato@leitura.example",
    site: "https://leitura.example",
    endereco: "Avenida Exemplo, 200, Savassi",
    horario: "Seg. a sex., das 8h às 18h",
  },
  {
    nome: "Mata Exemplo",
    causa: "ambiente",
    cidade: "Curitiba",
    uf: "PR",
    descricao: "Mutirões de plantio e limpeza de rios.",
    telefone: "(41) 0000-0003",
    whatsapp: "(41) 00000-0003",
    email: "contato@mata.example",
    site: "https://mata.example",
    endereco: "Rua Exemplo, 300, Batel",
    horario: "Ter. a sáb., das 9h às 16h",
  },
  {
    nome: "Prato Exemplo",
    causa: "alimentacao",
    cidade: "Salvador",
    uf: "BA",
    descricao: "Cozinha comunitária e entrega de cestas básicas.",
    telefone: "(71) 0000-0004",
    whatsapp: "(71) 00000-0004",
    email: "contato@prato.example",
    site: "",
    endereco: "Rua Exemplo, 400, Barra",
    horario: "Seg. a sáb., das 8h às 14h",
  },
  {
    nome: "Cuidar Exemplo",
    causa: "saude",
    cidade: "Recife",
    uf: "PE",
    descricao: "Acompanhamento de pacientes em tratamento.",
    telefone: "(81) 0000-0005",
    whatsapp: "(81) 00000-0005",
    email: "contato@cuidar.example",
    site: "https://cuidar.example",
    endereco: "Avenida Exemplo, 500, Boa Vista",
    horario: "Seg. a sex., das 8h às 17h",
  },
  {
    nome: "Lar Exemplo",
    causa: "moradia",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    descricao: "Reforma de casas de famílias em situação vulnerável.",
    telefone: "(21) 0000-0006",
    whatsapp: "",
    email: "contato@lar.example",
    site: "https://lar.example",
    endereco: "Rua Exemplo, 600, Tijuca",
    horario: "Seg. a sex., das 9h às 18h",
  },
  {
    nome: "Elas Exemplo",
    causa: "mulheres",
    cidade: "Porto Alegre",
    uf: "RS",
    descricao: "Acolhimento e orientação jurídica para mulheres.",
    telefone: "(51) 0000-0007",
    whatsapp: "(51) 00000-0007",
    email: "contato@elas.example",
    site: "https://elas.example",
    endereco: "Rua Exemplo, 700, Cidade Baixa",
    horario: "Seg. a sex., das 9h às 17h",
  },
  {
    nome: "Vovós Exemplo",
    causa: "idosos",
    cidade: "Fortaleza",
    uf: "CE",
    descricao: "Visitas e atividades para pessoas idosas.",
    telefone: "(85) 0000-0008",
    whatsapp: "(85) 00000-0008",
    email: "",
    site: "",
    endereco: "Rua Exemplo, 800, Aldeota",
    horario: "Seg. a sex., das 8h às 16h",
  },
  {
    nome: "Bichos Exemplo",
    causa: "animais",
    cidade: "Brasília",
    uf: "DF",
    descricao: "Lar temporário e castração de animais de rua.",
    telefone: "(61) 0000-0009",
    whatsapp: "(61) 00000-0009",
    email: "contato@bichos.example",
    site: "https://bichos.example",
    endereco: "Quadra Exemplo, 900, Asa Sul",
    horario: "Sáb. e dom., das 9h às 15h",
  },
  {
    nome: "Saber Exemplo",
    causa: "educacao",
    cidade: "São Paulo",
    uf: "SP",
    descricao: "Cursinho comunitário para jovens da periferia.",
    telefone: "(11) 0000-0010",
    whatsapp: "(11) 00000-0010",
    email: "contato@saber.example",
    site: "https://saber.example",
    endereco: "Rua Exemplo, 1000, Itaquera",
    horario: "Seg. a sex., das 14h às 21h",
  },
  {
    nome: "Rio Limpo Exemplo",
    causa: "ambiente",
    cidade: "Recife",
    uf: "PE",
    descricao: "Educação ambiental e coleta de lixo nas margens.",
    telefone: "(81) 0000-0011",
    whatsapp: "(81) 00000-0011",
    email: "contato@riolimpo.example",
    site: "",
    endereco: "Rua Exemplo, 1100, Casa Forte",
    horario: "Seg. a sex., das 9h às 16h",
  },
  {
    nome: "Sopa Exemplo",
    causa: "alimentacao",
    cidade: "São Paulo",
    uf: "SP",
    descricao: "Distribuição de refeições para pessoas em situação de rua.",
    telefone: "(11) 0000-0012",
    whatsapp: "(11) 00000-0012",
    email: "contato@sopa.example",
    site: "https://sopa.example",
    endereco: "Rua Exemplo, 1200, Sé",
    horario: "Todos os dias, das 17h às 21h",
  },
];

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

const modeloCard = document.getElementById("modelo-card");
const modeloContato = document.getElementById("modelo-contato");

/* ---------- Funções de apoio ---------- */

// Tira acentos e maiúsculas: "São Paulo" e "sao paulo" viram o mesmo texto
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function somenteDigitos(texto) {
  return texto.replace(/\D/g, "");
}

function linkTelefone(numero) {
  return "tel:+55" + somenteDigitos(numero);
}

function linkWhatsapp(numero) {
  return "https://wa.me/55" + somenteDigitos(numero);
}

function iconeDaCausa(causa) {
  return "#icone-" + causa;
}

/* ---------- Busca ---------- */

function buscarOngs() {
  const texto = normalizar(campoTexto.value);
  const causa = campoCausa.value;

  return ONGS.filter(function (ong) {
    const ondeProcurar = normalizar(ong.nome + " " + ong.cidade + " " + ong.uf);
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
  card.querySelector(".card-causa").textContent = CAUSAS[ong.causa];
  card.querySelector(".card-local").textContent = ong.cidade + ", " + ong.uf;
  card.querySelector(".card-desc").textContent = ong.descricao;

  const telefone = card.querySelector(".card-telefone");
  telefone.href = linkTelefone(ong.telefone);
  telefone.setAttribute("aria-label", "Ligar para " + ong.nome + ": " + ong.telefone);
  telefone.querySelector("span").textContent = ong.telefone;

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
    CAUSAS[ong.causa] + " · " + ong.cidade + ", " + ong.uf;
  document.getElementById("detalhes-desc").textContent = ong.descricao;
  document.getElementById("detalhes-ligar").href = linkTelefone(ong.telefone);

  const linhas = [criarLinhaContato("telefone", "Telefone", ong.telefone, linkTelefone(ong.telefone))];
  if (ong.whatsapp) {
    linhas.push(criarLinhaContato("whatsapp", "WhatsApp", ong.whatsapp, linkWhatsapp(ong.whatsapp)));
  }
  if (ong.email) {
    linhas.push(criarLinhaContato("email", "E-mail", ong.email, "mailto:" + ong.email));
  }
  if (ong.site) {
    linhas.push(criarLinhaContato("site", "Site", ong.site.replace("https://", ""), ong.site));
  }
  linhas.push(criarLinhaContato("endereco", "Endereço", ong.endereco + " · " + ong.cidade + ", " + ong.uf));
  if (ong.horario) {
    linhas.push(criarLinhaContato("horario", "Horário de atendimento", ong.horario));
  }
  document.getElementById("detalhes-contatos").replaceChildren(...linhas);

  botaoCopiar.textContent = "Copiar número";
  botaoCopiar.dataset.numero = ong.telefone;
  janela.showModal();
}

async function copiarNumero() {
  const numero = botaoCopiar.dataset.numero;

  try {
    await navigator.clipboard.writeText(numero);
  } catch (erro) {
    // Alternativa para navegadores que bloqueiam a área de transferência
    const campo = document.createElement("textarea");
    campo.value = numero;
    janela.append(campo);
    campo.select();
    document.execCommand("copy");
    campo.remove();
  }

  botaoCopiar.textContent = "Número copiado";
}

/* ---------- Preenchimento inicial ---------- */

function montarCausas() {
  Object.entries(CAUSAS).forEach(function ([chave, nome]) {
    const opcao = document.createElement("option");
    opcao.value = chave;
    opcao.textContent = nome;
    campoCausa.append(opcao);

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "causa";
    botao.dataset.causa = chave;
    botao.setAttribute("aria-pressed", "false");
    botao.innerHTML = '<svg aria-hidden="true"><use href="' + iconeDaCausa(chave) + '"></use></svg>';
    botao.append(nome);
    botao.addEventListener("click", function () {
      // Clicar de novo na causa escolhida tira o filtro
      campoCausa.value = campoCausa.value === chave ? "" : chave;
      atualizarPagina();
      irParaResultados();
    });
    gradeCausas.append(botao);
  });
}

function montarCidades() {
  const cidades = [...new Set(ONGS.map((ong) => ong.cidade))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const listaSugestoes = document.getElementById("lista-cidades");

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

/* ---------- Eventos ---------- */

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

// Clicar fora da janela também fecha
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

montarCausas();
montarCidades();
atualizarPagina();
