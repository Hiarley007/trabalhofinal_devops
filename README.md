# Aluno Online

Sistema web de gestão escolar com autenticação, painel do aluno e consulta de informações acadêmicas. Construído com React no frontend, Node.js no backend e PostgreSQL como banco de dados, orquestrado via Docker Compose e com pipeline de CI/CD configurada no GitHub Actions.

---

## Stack

| Camada         | Tecnologia              |
|----------------|-------------------------|
| Frontend       | React + Vite            |
| Backend        | Node.js + Express       |
| Banco de Dados | PostgreSQL              |
| Containers     | Docker + Docker Compose |
| CI/CD          | GitHub Actions          |
| Testes         | Jest + Supertest        |

---

## Estrutura do Projeto

```
aluno-online-react/
│
├── .github/
│   └── workflows/
│       └── github-actions-demo.yml
│
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── db/
│   └── init.sql
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── avatar.svg
│       │   └── learn.svg
│       ├── components/
│       │   ├── Card.jsx
│       │   ├── FormLogin.jsx
│       │   ├── InputMatricula.jsx
│       │   ├── InputSenha.jsx
│       │   ├── InputSubmit.jsx
│       │   ├── Main.jsx
│       │   ├── Menu.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Tabela.jsx
│       │   └── Topbar.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       │   └── useAuth.jsx
│       ├── layout/
│       │   └── Layout.jsx
│       ├── pages/
│       │   ├── Boletos.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Erro404.jsx
│       │   ├── Faltas.jsx
│       │   ├── Login.jsx
│       │   ├── Notas.jsx
│       │   └── Requerimentos.jsx
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── Login.css
│       └── main.jsx
│
├── docker-compose.yml
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

---

## Páginas

| Rota             | Descrição                                   |
|------------------|---------------------------------------------|
| `/`              | Login com matrícula e senha                 |
| `/dashboard`     | Painel principal do aluno                   |
| `/boletos`       | Situação financeira e boletos               |
| `/notas`         | Notas por disciplina                        |
| `/faltas`        | Frequência e registro de faltas             |
| `/requerimentos` | Solicitações e requerimentos acadêmicos     |
| `*`              | Página 404 para rotas não encontradas       |

---

## Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados

### Subindo o ambiente

```bash
git clone https://github.com/seu-usuario/aluno-online-react.git
cd aluno-online-react

cp .env.example .env  # configure as variáveis

docker compose up --build
```

| Serviço  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:3000    |
| Backend  | http://localhost:5000    |

---

## Testes

```bash
cd backend
npm install
npm test
```

Os testes cobrem os endpoints principais da API usando **Jest** e **Supertest**.

---

## Pipeline CI/CD

O workflow em `.github/workflows/github-actions-demo.yml` é disparado a cada push na branch `main` e executa:

1. Instalação de dependências
2. Execução dos testes
3. Build da aplicação
4. Build e publicação das imagens Docker
5. Deploy automatizado com suporte a rollback

---

## Correções de Infraestrutura

A aplicação foi recebida com falhas propositais. As correções realizadas cobriram:

- **Rede entre containers** — variáveis de ambiente e DNS interno do Docker configurados corretamente
- **Ordem de inicialização** — `depends_on` e `healthchecks` garantem que o banco suba antes do backend
- **Persistência** — volumes nomeados adicionados ao PostgreSQL para sobreviver a reinicializações
- **Build** — dependências ausentes, versões incompatíveis e caminhos incorretos nos Dockerfiles corrigidos
- **Segurança** — credenciais movidas para `.env`, adicionado ao `.gitignore`, e secrets configurados no GitHub

---

## Segurança

- Variáveis sensíveis em `.env` (não versionado)
- Secrets da pipeline configurados em **Settings → Secrets → Actions** no GitHub
- Nenhuma credencial exposta no código-font

---

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.