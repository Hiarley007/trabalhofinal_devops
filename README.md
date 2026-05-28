# 🎓 Aluno Online

Sistema web de gestão acadêmica que permite ao aluno consultar notas, faltas, boletos e realizar requerimentos — tudo em um só lugar.

O projeto é composto por um frontend em **React**, uma API em **Node.js + Express** e um banco de dados **PostgreSQL**, todos rodando em containers **Docker** e com pipeline de integração contínua configurada no **GitHub Actions**.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Páginas da Aplicação](#-páginas-da-aplicação)
- [Como Executar](#-como-executar)
- [Testes](#-testes)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Correções de Infraestrutura](#-correções-de-infraestrutura)
- [Equipe](#-equipe)

---

## 🔭 Visão Geral

O **Aluno Online** resolve o problema de alunos que precisam acessar informações acadêmicas dispersas em sistemas diferentes. Com ele, é possível:

- Fazer login com matrícula e senha
- Visualizar notas de todas as disciplinas
- Acompanhar o histórico de faltas
- Consultar e gerenciar boletos
- Abrir requerimentos acadêmicos

A aplicação foi desenvolvida como atividade prática de DevOps, com foco em containerização, automação e boas práticas de infraestrutura.

---

## 🛠️ Tecnologias

| Camada         | Tecnologia                  | Por quê?                                                        |
|----------------|-----------------------------|-----------------------------------------------------------------|
| Frontend       | React 18 + Vite             | Interface reativa e build rápido                                |
| Backend        | Node.js + Express           | API REST leve e de fácil manutenção                             |
| Banco de Dados | PostgreSQL                  | Banco relacional robusto e open source                          |
| Containers     | Docker + Docker Compose     | Garante que o ambiente seja igual em qualquer máquina           |
| CI/CD          | GitHub Actions              | Automatiza testes e deploy a cada push                          |
| Testes         | Jest + Supertest            | Testes de integração na API sem precisar subir o servidor real  |
| Linting        | ESLint                      | Padronização e qualidade do código                              |

---

## 🗂️ Estrutura do Projeto

Abaixo está a organização completa dos arquivos e pastas do projeto. Cada diretório tem uma responsabilidade bem definida:

```
aluno-online-react/
│
├── .github/                        # Configurações do GitHub
│   └── workflows/
│       └── github-actions-demo.yml # Pipeline de CI/CD
│
├── backend/                        # Servidor da API REST
│   ├── .env                        # Variáveis de ambiente (não versionado)
│   ├── package.json                # Dependências do backend
│   └── server.js                   # Ponto de entrada da API
│
├── db/                             # Configuração do banco de dados
│   └── init.sql                    # Script de criação das tabelas
│
├── frontend/                       # Aplicação React
│   ├── public/                     # Arquivos estáticos públicos
│   ├── index.html                  # HTML base da aplicação
│   ├── vite.config.js              # Configuração do Vite
│   ├── eslint.config.js            # Regras de linting
│   ├── package.json                # Dependências do frontend
│   ├── docker-compose.yml          # Orquestração dos containers
│   └── src/
│       ├── assets/                 # Imagens e ícones SVG
│       │   ├── avatar.svg
│       │   └── learn.svg
│       ├── components/             # Componentes reutilizáveis da UI
│       │   ├── Card.jsx            # Card genérico
│       │   ├── FormLogin.jsx       # Formulário de login
│       │   ├── InputMatricula.jsx  # Campo de matrícula
│       │   ├── InputSenha.jsx      # Campo de senha
│       │   ├── InputSubmit.jsx     # Botão de submit
│       │   ├── Main.jsx            # Área de conteúdo principal
│       │   ├── Menu.jsx            # Menu de navegação
│       │   ├── Sidebar.jsx         # Barra lateral
│       │   ├── Tabela.jsx          # Tabela de dados genérica
│       │   └── Topbar.jsx          # Barra superior
│       ├── context/
│       │   └── AuthContext.jsx     # Contexto global de autenticação
│       ├── hooks/
│       │   └── useAuth.jsx         # Hook para acessar o contexto de auth
│       ├── layout/
│       │   └── Layout.jsx          # Layout padrão com sidebar e topbar
│       ├── pages/                  # Uma pasta por tela da aplicação
│       │   ├── Boletos.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Erro404.jsx
│       │   ├── Faltas.jsx
│       │   ├── Login.jsx
│       │   ├── Notas.jsx
│       │   └── Requerimentos.jsx
│       ├── App.jsx                 # Roteamento principal
│       ├── App.css
│       ├── index.css
│       ├── Login.css
│       └── main.jsx                # Ponto de entrada do React
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📄 Páginas da Aplicação

| Página           | Caminho          | O que faz                                               |
|------------------|------------------|---------------------------------------------------------|
| Login            | `/`              | Autentica o aluno com matrícula e senha                 |
| Dashboard        | `/dashboard`     | Tela inicial após o login com resumo geral              |
| Notas            | `/notas`         | Lista as notas do aluno por disciplina                  |
| Faltas           | `/faltas`        | Exibe o histórico de frequência e faltas                |
| Boletos          | `/boletos`       | Mostra situação financeira e boletos pendentes          |
| Requerimentos    | `/requerimentos` | Permite abrir e acompanhar solicitações acadêmicas      |
| Erro 404         | `*`              | Exibida quando o aluno acessa uma rota inexistente      |

---

## 🚀 Como Executar

### Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Docker](https://www.docker.com/) — para rodar os containers
- [Docker Compose](https://docs.docker.com/compose/) — para orquestrar os serviços

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/aluno-online-react.git
cd aluno-online-react
```

**2. Configure as variáveis de ambiente**

Crie o arquivo `.env` dentro da pasta `backend/` com base no exemplo abaixo:

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=aluno_online

PORT=5000
JWT_SECRET=sua_chave_secreta_aqui
```

> ⚠️ Nunca compartilhe ou versione o arquivo `.env`. Ele já está no `.gitignore`.

**3. Suba os containers**

```bash
docker compose up --build
```

Esse comando vai:
- Construir as imagens do frontend e backend
- Inicializar o banco de dados com o script `init.sql`
- Subir os três serviços na ordem correta

**4. Acesse a aplicação**

| Serviço         | Endereço                   |
|-----------------|----------------------------|
| Frontend        | http://localhost:3000      |
| API (Backend)   | http://localhost:5000      |
| Banco de Dados  | localhost:5432             |

### Comandos úteis

```bash
# Parar todos os containers
docker compose down

# Ver os containers em execução
docker ps

# Ver os logs de um container específico
docker logs <CONTAINER_ID>

# Recriar os containers do zero (limpa volumes)
docker compose down -v && docker compose up --build
```

---

## 🧪 Testes

Os testes automatizados ficam na pasta `backend/` e cobrem os principais endpoints da API.

### Executar os testes

```bash
cd backend
npm install
npm test
```

### O que é testado

- `GET /health` — verifica se a API está no ar
- Endpoints principais da API — valida respostas, status codes e estrutura dos dados

Os testes utilizam **Jest** como framework e **Supertest** para simular requisições HTTP sem precisar subir o servidor manualmente.

---

## 🔄 Pipeline CI/CD

O arquivo `.github/workflows/github-actions-demo.yml` define a pipeline de integração e entrega contínua.

### Quando é executada?

Automaticamente a cada `push` para a branch `main`.

### O que ela faz?

```
1. Instala as dependências
       ↓
2. Executa os testes automatizados
       ↓
3. Realiza o build da aplicação
       ↓
4. Constrói as imagens Docker
       ↓
5. Publica as imagens no registry
       ↓
6. Faz o deploy automático
       ↓
7. Em caso de falha → rollback automático
```

### Secrets necessários no GitHub

Para a pipeline funcionar, configure os seguintes secrets em **Settings → Secrets and variables → Actions**:

| Secret            | Descrição                              |
|-------------------|----------------------------------------|
| `DOCKER_USERNAME` | Seu usuário no Docker Hub              |
| `DOCKER_PASSWORD` | Seu token de acesso ao Docker Hub      |
| `DB_PASSWORD`     | Senha do banco de dados em produção    |
| `JWT_SECRET`      | Chave secreta para geração de tokens   |

---

## 🔒 Segurança

Este projeto segue as boas práticas de segurança para aplicações em containers:

- ✅ Credenciais e dados sensíveis ficam no `.env`, que está no `.gitignore`
- ✅ A pipeline usa GitHub Secrets — nenhuma senha aparece nos logs
- ✅ O banco de dados não é exposto diretamente para a internet
- ✅ As imagens Docker usam versões fixas para evitar quebras inesperadas

---

## 🛠️ Correções de Infraestrutura

O projeto foi recebido com uma série de falhas propositais de infraestrutura. A tabela abaixo resume o que foi encontrado e como foi resolvido:

| Problema encontrado                                     | Causa raiz                                          | Como foi corrigido                                                  |
|---------------------------------------------------------|-----------------------------------------------------|---------------------------------------------------------------------|
| Frontend não conseguia se comunicar com a API           | URL da API estava fixada como `localhost`            | Substituída por variável de ambiente `VITE_API_URL` via Docker      |
| Backend tentava conectar ao banco antes de ele estar pronto | Containers subiam sem ordem definida            | Adicionado `depends_on` com `healthcheck` no `docker-compose.yml`   |
| Dados do banco eram apagados ao reiniciar os containers | Nenhum volume persistente configurado               | Volume nomeado mapeado para `/var/lib/postgresql/data`              |
| Build falhava em produção                               | Dependências ausentes e versões de Node incompatíveis | Dockerfiles revisados com versões fixas e dependências corretas    |
| Senhas e chaves expostas diretamente no código          | Credenciais hardcoded nos arquivos                  | Movidas para `.env` e GitHub Secrets                                |

---

## 👥 Equipe

| Nome | Função |
|------|--------|
|      |        |
|      |        |
|      |        |

---

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [`LICENSE`](./LICENSE) para mais detalhes.