<div align="center">

<img src="./aluno-online-react/frontend/src/assets/aluno_online_readme_header.svg" alt="descrição" width="600" />

**Trabalho Final — Manutenção de Software e DevOps**

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Prisma](https://img.shields.io/badge/ORM-Prisma_5-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Jest](https://img.shields.io/badge/Tests-Jest-C21325?style=flat-square&logo=jest&logoColor=white)

> Sistema web fullstack para gerenciamento acadêmico — autenticação JWT, rotas protegidas e infraestrutura containerizada.

---

🏫 **Centro Universitário IESB** &nbsp;|&nbsp; 💻 **Análise e Desenvolvimento de Sistemas** &nbsp;|&nbsp; 📅 **3° Semestre**

</div>

---

## 📋 Índice

- [Sobre](#-sobre)
- [Stack](#-stack)
- [Estrutura](#-estrutura)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar](#-como-executar)
- [Acesso ao Sistema](#-acesso-ao-sistema)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Rotas](#-rotas)
- [Testes](#-testes)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Equipe](#-equipe)

---

## 📖 Sobre

O **Aluno Online** é uma aplicação fullstack desenvolvida como trabalho final da disciplina de **Manutenção de Software e DevOps** no **Centro Universitário IESB**.

**Funcionalidades:**
- 🔐 Autenticação segura com **JWT + bcrypt**
- 📊 Visualização de **notas e faltas**
- 💰 Consulta de **boletos financeiros**
- 📝 Envio e acompanhamento de **requerimentos**
- 🐳 Infraestrutura **containerizada com Docker**
- ⚙️ Pipeline de **CI/CD com GitHub Actions**

---

## 🚀 Stack

### Frontend
| Lib | Versão | Uso |
|-----|--------|-----|
| `react` | 18+ | Interface |
| `vite` | 7+ | Bundler |
| `react-router` | v7 | Navegação |
| `tailwindcss` | v4 | Estilização |

### Backend
| Lib | Versão | Uso |
|-----|--------|-----|
| `node.js` | 20 | Runtime |
| `express` | 4+ | Framework HTTP |
| `prisma` | 5+ | ORM |
| `postgresql` | 16 | Banco de dados |
| `jsonwebtoken` | 9+ | Autenticação |
| `bcrypt` | 5+ | Criptografia |

### DevOps
| Ferramenta | Uso |
|-----------|-----|
| `docker` + `docker compose` | Containerização e orquestração |
| `github actions` | Pipeline CI/CD |
| `jest` + `supertest` | Testes automatizados |

---

## 📁 Estrutura

```
trabalhofinal_devops/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # pipeline principal
│       └── github-actions-demo.yml
│
└── aluno-online-react/
    ├── backend/
    │   ├── prisma/
    │   │   ├── migrations/           # histórico de migrações
    │   │   └── schema.prisma         # modelo de dados
    │   ├── tests/
    │   │   └── server.test.js        # testes de integração
    │   ├── .env                      # variáveis (não versionado)
    │   ├── Dockerfile
    │   ├── prisma.config.ts
    │   └── server.js                 # entry point da api
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── assets/
    │   │   │   ├── avatar.svg
    │   │   │   └── learn.svg
    │   │   ├── components/
    │   │   │   ├── Card.jsx
    │   │   │   ├── FormLogin.jsx
    │   │   │   ├── InputMatricula.jsx
    │   │   │   ├── InputSenha.jsx
    │   │   │   ├── InputSubmit.jsx
    │   │   │   ├── Main.jsx
    │   │   │   ├── Menu.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── Tabela.jsx
    │   │   │   └── Topbar.jsx
    │   │   ├── context/
    │   │   │   └── AuthContext.jsx   # estado global de auth
    │   │   ├── forms/
    │   │   │   └── RequerimentoForm.jsx
    │   │   ├── hooks/
    │   │   │   └── useAuth.jsx       # hook customizado
    │   │   ├── layout/
    │   │   │   └── Layout.jsx
    │   │   ├── pages/
    │   │   │   ├── Boletos.jsx
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Erro404.jsx
    │   │   │   ├── Faltas.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── Notas.jsx
    │   │   │   └── Requerimentos.jsx
    │   │   ├── tests/
    │   │   │   └── App.test.js
    │   │   ├── App.jsx
    │   │   ├── App.css
    │   │   ├── index.css
    │   │   ├── Login.css
    │   │   └── main.jsx
    │   ├── Dockerfile
    │   ├── index.html
    │   └── vite.config.js
    │
    └── docker-compose.yml
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 20+](https://nodejs.org/) *(apenas para execução sem Docker)*
- [Git](https://git-scm.com/)

---

## ▶️ Como Executar

### 🐳 Com Docker (recomendado)

> Sobe frontend, backend e banco de dados com um único comando.

```bash
# 1. Clonar o repositório
git clone https://github.com/Hiarley007/trabalhofinal_devops.git

# 2. Entrar na pasta do projeto
cd trabalhofinal_devops/aluno-online-react

# 3. Subir todos os containers
docker compose up --build
```

Aguarde a inicialização. Quando os três containers estiverem rodando, acesse:

| Serviço | URL |
|---------|-----|
| 🌐 Frontend | http://localhost:5173 |
| 🔧 API REST | http://localhost:3001 |
| 🗄️ PostgreSQL | localhost:5432 |

Para parar os containers:
```bash
docker compose down
```

---

### 💻 Sem Docker (passo a passo)

#### 1. Instalar e iniciar o PostgreSQL

```bash
# Ubuntu/Linux Mint
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 2. Criar o banco de dados e o usuário

```bash
sudo -u postgres psql
```

Dentro do psql:
```sql
CREATE DATABASE aluno_online;
CREATE USER devops_user WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE aluno_online TO devops_user;
\q
```

#### 3. Configurar e rodar o backend

```bash
cd aluno-online-react/backend

# Instalar dependências
npm install

# Criar o arquivo .env (veja a seção Variáveis de Ambiente)
# Executar as migrações do banco
npx prisma migrate dev --name init

# Inserir usuário de teste no banco
npx prisma studio
# Acesse http://localhost:5555, abra a tabela Usuario e adicione:
# nome: Hiarley | matricula: 2026001 | senha: 123456

# Iniciar o servidor
npm run dev
```

O backend estará disponível em `http://localhost:3001`.

#### 4. Verificar se o backend está funcionando

```bash
curl http://localhost:3001/health
# Resposta esperada: {"status":"ok"}
```

#### 5. Configurar e rodar o frontend

Abra um **novo terminal**:

```bash
cd aluno-online-react/frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## 🔑 Acesso ao Sistema

Após subir o projeto (com ou sem Docker), acesse http://localhost:5173 e faça login com:

| Campo | Valor |
|-------|-------|
| **Matrícula** | `2026001` |
| **Senha** | `123456` |

> ⚠️ Se estiver rodando **sem Docker**, o usuário precisa ser criado manualmente via `npx prisma studio` conforme o passo 3 acima.

---

## 🔐 Variáveis de Ambiente

Crie o arquivo `.env` dentro da pasta `backend/`:

```env
# Banco de dados
DATABASE_URL="postgresql://devops_user:123456@localhost:5432/aluno_online"

# JWT
JWT_SECRET="sua_chave_secreta_aqui"

# Servidor
PORT=3001
```

> ⚠️ O arquivo `.env` **não é versionado** por segurança. Nunca comite senhas reais.

Quando usar Docker, as variáveis são definidas diretamente no `docker-compose.yml`:

```env
DATABASE_URL=postgresql://devops_user:123456@postgres:5432/aluno_online
```

---

## 🗺️ Rotas

### 🔓 Públicas
| Rota | Página |
|------|--------|
| `/login` | Autenticação |

### 🔒 Protegidas (requer login)
| Rota | Página |
|------|--------|
| `/` | Dashboard |
| `/notas` | Notas por disciplina |
| `/faltas` | Registro de faltas |
| `/boletos` | Situação financeira |
| `/requerimentos` | Lista de requerimentos |
| `/novo` | Novo requerimento |

---

## 🧪 Testes

### Backend (Jest + Supertest)

```bash
cd aluno-online-react/backend
npm test
```

Resultado esperado:
```
PASS  tests/server.test.js
  Health Check
    ✓ deve retornar status ok
```

### Frontend (Vitest)

```bash
cd aluno-online-react/frontend
npm test
```

Resultado esperado:
```
✓ src/tests/App.test.js (1 test)
  ✓ Frontend > deve passar no teste básico
```

---

## ⚙️ Pipeline CI/CD

O pipeline roda automaticamente em todo **push para a branch `main`**.

```
push → main
     │
     ▼
  checkout do código
     │
     ▼
  instalar Node.js 20
     │
     ├── instalar deps do backend
     ├── rodar testes do backend (jest)
     │
     ├── instalar deps do frontend
     ├── rodar testes do frontend (vitest)
     ├── build do frontend (vite build)
     │
     ├── login no Docker Hub
     ├── build + push da imagem do backend
     └── build + push da imagem do frontend
```

Pipeline definido em `.github/workflows/ci.yml`.

Para acompanhar a execução:
1. Acesse o repositório em https://github.com/Hiarley007/trabalhofinal_devops
2. Clique na aba **Actions**
3. Selecione o workflow **CI**

---

## 👨‍💻 Equipe

| Nome | GitHub |
|------|--------|
| Hiarley | [@Hiarley007](https://github.com/Hiarley007) |

---

<div align="center">

**Centro Universitário IESB** — Análise e Desenvolvimento de Sistemas · 3° Semestre

Disciplina: Manutenção de Software e DevOps

---

</div>