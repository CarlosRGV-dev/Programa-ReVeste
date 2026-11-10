# Programa ReVeste — LocaONG

Site para **encontrar ONGs por cidade ou causa** e entrar em contato com elas pelo telefone, WhatsApp, e-mail ou site. Qualquer visitante também pode **cadastrar uma nova ONG**, que aparece na lista na mesma hora.

Os dados ficam no [Supabase](https://supabase.com) (PostgreSQL), e o site é feito só com HTML, CSS e JavaScript puro, sem framework e sem etapa de build.

---

## Funcionalidades

- 🔎 **Busca por texto**: procura pelo nome da ONG, pela cidade ou pela UF, sem diferenciar acentos nem maiúsculas.
- 🏷️ **Filtro por causa**: animais, crianças e educação, meio ambiente, alimentação, saúde, moradia, mulheres e pessoas idosas.
- 📍 **Atalhos por cidade**: botões "ONGs em …" gerados a partir das cidades cadastradas.
- 📇 **Janela de contatos**: mostra telefone, WhatsApp, e-mail, site, endereço e horário de atendimento, com links clicáveis e um botão para copiar o número.
- ➕ **Formulário de cadastro**: grava a ONG direto no banco e atualiza a lista.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | HTML5, CSS3 |
| Lógica | JavaScript (ES2017+) |
| Banco de dados / API | Supabase (PostgreSQL + REST) |
| Cliente | `@supabase/supabase-js` v2 via CDN |

## Estrutura do projeto

```
Programa-ReVeste/
├── index.html          # Página: busca, causas, lista de ONGs, modal e formulário
├── style.css           # Estilos
├── javaScript.js       # Lógica do site e comunicação com o Supabase
├── supabase_setup.sql  # Cria tabelas, view, categorias e permissões no banco
└── README.md
```

## Banco de dados

```
organizations ──< organization_locations
      │
      └──< organization_categories >── categories
```

| Tabela / View | Para que serve |
|---|---|
| `organizations` | Nome, slug, descrição, e-mail, site, horário e status da ONG |
| `organization_locations` | Cidade, UF, endereço, telefone e WhatsApp |
| `categories` | As 8 causas (o `slug` é usado no filtro do site) |
| `organization_categories` | Liga cada ONG à sua causa |
| `ongs_view` | Junta tudo com os nomes de campo em português; é **o que o site lê** |

Só as ONGs com `status = 'active'` aparecem no site.

## Como rodar

### 1. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com), ou use o projeto que já existe.
2. Abra **SQL Editor → New query**, cole o conteúdo de `supabase_setup.sql` e clique em **Run**. O script pode ser rodado mais de uma vez sem problema.
3. Em **Settings → API**, copie a **Project URL** e a **chave pública** (`anon` / `publishable`).

### 2. Ligar o site ao banco

No começo do `javaScript.js`, troque os valores das duas constantes pelos do seu projeto:

```js
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'sua-chave-publica';
```

> A chave **publishable/anon** pode ficar no front-end; quem protege os dados são as regras de RLS. **Nunca** coloque a chave `service_role` no site.

### 3. Abrir

Abra o `index.html` no navegador. Também dá para servir a pasta localmente:

```bash
npx serve .
# ou
python -m http.server 8000
```

Para publicar, qualquer hospedagem estática funciona: GitHub Pages, Netlify ou Vercel.

## Permissões (RLS)

O `supabase_setup.sql` deixa o banco assim:

| Ação | Visitante (anon) |
|---|---|
| Ler ONGs e categorias | ✅ |
| Cadastrar ONG, endereço e causa | ✅ |
| Editar ou apagar | ❌ |

## Problemas comuns

| Erro no console (F12) | Causa | Solução |
|---|---|---|
| `42501 permission denied for table …` | O papel `anon` não tem `GRANT` na tabela | `grant select, insert on public.organizations, public.organization_locations, public.organization_categories to anon, authenticated;` |
| `new row violates row-level security policy` | Falta a policy de INSERT | Rodar de novo a parte 6 do `supabase_setup.sql` |
| `relation "ongs_view" does not exist` | O SQL de setup não foi rodado | Rodar o `supabase_setup.sql` |
| A lista fica vazia, sem erro | Não há ONGs com status `active` | Cadastrar uma ONG pelo formulário |
| Nada funciona e não aparece erro | O JavaScript não carregou | Conferir se o `index.html` aponta para `javaScript.js` |

Para conferir as permissões direto no banco:

```sql
select has_table_privilege('anon','public.organizations','INSERT') as pode_inserir,
       has_table_privilege('anon','public.organizations','SELECT') as pode_ler;
```

## Histórico

- **0.1.0**: protótipo
- **0.1.1**: formulário de cadastro
- **0.3.x**: integração com o Supabase
- **0.3.3**: corrige o caminho do script, gera slug único e adiciona o `supabase_setup.sql`
