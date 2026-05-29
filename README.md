<div align="center">

```
 ___  _     _  _ _  _   ___  _  _ _    _  _  ___
| _ || |   | || | \| | / _ \| \| | |  | || ||_ _|
|   /| |__ | || | .` || (_) | .` | |__| || | | |
|_|_\|____||_||_|_|\_| \___/|_|\_|____|_||_||___|
```

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
- [Como Executar](#-como-executar)
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
    │   └── server.js                 # entry point da api
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── assets/               # imagens e ícones
    │   │   ├── components/           # ui reutilizável
    │   │   │   ├── Card.jsx
    │   │   │   ├── FormLogin.jsx
    │   │   │   ├── InputMatricula.jsx
    │   │   │   ├── InputSenha.jsx
    │   │   │   ├── InputSubmit.jsx
    │   │   │   ├── Menu.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── Tabela.jsx
    │   │   │   └── Topbar.jsx
    │   │   ├── context/
    │   │   │   └── AuthContext.jsx   # estado global de auth
    │   │   ├── hooks/
    │   │   │   └── useAuth.jsx       # hook customizado
    │   │   ├── layout/
    │   │   │   └── Layout.jsx        # layout base protegido
    │   │   ├── pages/
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Notas.jsx
    │   │   │   ├── Faltas.jsx
    │   │   │   ├── Boletos.jsx
    │   │   │   ├── Requerimentos.jsx
    │   │   │   ├── Login.jsx
    │   │   │   └── Erro404.jsx
    │   │   ├── forms/
    │   │   │   └── RequerimentoForm.jsx
    │   │   ├── App.jsx               # rotas principais
    │   │   └── main.jsx              # entry point react
    │   ├── Dockerfile
    │   └── vite.config.js
    │
    └── docker-compose.yml            # orquestração completa
```

---

## ▶️ Como Executar

### 🐳 Docker (recomendado)

```bash
# clonar o repositório
git clone https://github.com/Hiarley007/trabalhofinal_devops.git
cd trabalhofinal_devops/aluno-online-react

# subir todos os containers
docker compose up --build
```

| Serviço | URL |
|---------|-----|
| 🌐 Frontend | `http://localhost:5173` |
| 🔧 API REST | `http://localhost:3001` |
| 🗄️ PostgreSQL | `localhost:5432` |

### 💻 Sem Docker

**Backend:**
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Variáveis de Ambiente

Crie `.env` em `backend/`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/aluno_online"
JWT_SECRET="sua_chave_secreta"
PORT=3001
```

> ⚠️ Nunca versione o `.env` com dados reais.

---

## 🗺️ Rotas

### 🔓 Públicas
| Rota | Página |
|------|--------|
| `/login` | Autenticação |

### 🔒 Protegidas (JWT)
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

```bash
# backend
cd backend && npm test

# frontend
cd frontend && npm test
```

---

## ⚙️ Pipeline CI/CD

```
push / pull_request
        │
        ▼
  ┌──────────────┐
  │  npm install │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  jest tests  │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │ docker build │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │    deploy    │
  └──────────────┘
```

Pipeline definido em `.github/workflows/ci.yml`.

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

`// feito com ❤️ e muito ☕`

</div>