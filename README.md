# 🎓 Aluno Online — Sistema de Gestão Escolar

Sistema web de gestão escolar desenvolvido com React no frontend, Node.js + Express no backend e PostgreSQL como banco de dados, totalmente containerizado com Docker e com pipeline CI/CD via GitHub Actions.

---

## 📐 Arquitetura

```
frontend (React + Vite)
        ↓
backend (Node.js + Express)
        ↓
banco de dados (PostgreSQL)
```

Todos os serviços são orquestrados via **Docker Compose** em uma rede interna isolada.

---

## 🗂️ Estrutura do Projeto

```
aluno-online-react/
│
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── db/
│   └── init.sql
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── FormLogin.jsx
│   │   ├── InputMatricula.jsx
│   │   ├── InputSenha.jsx
│   │   ├── InputSubmit.jsx
│   │   ├── Main.jsx
│   │   ├── Menu.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Tabela.jsx
│   │   └── Topbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.jsx
│   ├── layout/
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Boletos.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Erro404.jsx
│   │   ├── Faltas.jsx
│   │   ├── Login.jsx
│   │   ├── Notas.jsx
│   │   └── Requerimentos.jsx
│   ├── App.css
│   └── App.jsx
│
├── public/
├── docker-compose.yml
├── .env
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

---

## 📄 Páginas da Aplicação

| Página           | Descrição                                      |
|------------------|------------------------------------------------|
| `Login`          | Autenticação do aluno via matrícula e senha    |
| `Dashboard`      | Visão geral do aluno após o login              |
| `Boletos`        | Listagem e situação dos boletos financeiros    |
| `Notas`          | Consulta de notas por disciplina               |
| `Faltas`         | Registro de frequência e faltas                |
| `Requerimentos`  | Solicitações e requerimentos acadêmicos        |
| `Erro404`        | Página de rota não encontrada                  |

---

## ⚙️ Tecnologias Utilizadas

| Camada         | Tecnologia              |
|----------------|-------------------------|
| Frontend       | React                   |
| Backend        | Node.js + Express       |
| Banco de Dados | PostgreSQL               |
| Containers     | Docker                  |
| Orquestração   | Docker Compose          |
| CI/CD          | GitHub Actions          |
| Testes         | Jest + Supertest        |

---

## 🛠️ Correções Realizadas

Durante o projeto, a equipe identificou e corrigiu um conjunto de problemas de infraestrutura que impediam o funcionamento correto da aplicação em ambiente containerizado. As correções abrangeram as seguintes áreas:

- **Comunicação entre serviços:** ajustes nas configurações de rede e nas variáveis de ambiente para garantir que os serviços se localizem corretamente dentro da rede Docker.
- **Ordem de inicialização dos containers:** implementação de políticas de dependência e verificações de saúde (*healthchecks*) para que os serviços subam na sequência correta.
- **Persistência de dados:** configuração de volumes Docker para garantir que os dados do banco não sejam perdidos entre reinicializações.
- **Build e dependências:** resolução de incompatibilidades de versão, caminhos incorretos e dependências ausentes nos Dockerfiles e arquivos de configuração.
- **Segurança de variáveis sensíveis:** remoção de credenciais expostas no código, adoção de arquivos `.env` e uso de *secrets* no GitHub Actions.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/aluno-online-react.git
   cd aluno-online-react
   ```

2. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com os valores adequados
   ```

3. Suba os containers:
   ```bash
   docker compose up --build
   ```

4. Acesse a aplicação:
   - **Frontend:** `http://localhost:3000`
   - **Backend (API):** `http://localhost:5000`

---

## 🧪 Como Executar os Testes

Os testes automatizados cobrem os principais endpoints da API e são executados com **Jest** e **Supertest**.

```bash
cd backend
npm install
npm test
```

---

## 📦 Gerenciamento dos Containers

```bash
# Subir os serviços
docker compose up --build

# Derrubar os serviços
docker compose down

# Ver containers em execução
docker ps

# Ver logs de um container específico
docker logs <CONTAINER_ID>
```

---

## 🔄 Pipeline CI/CD (GitHub Actions)

O workflow de CI/CD é disparado automaticamente a cada **push para a branch `main`** e executa as seguintes etapas:

1. Instalação das dependências
2. Execução dos testes automatizados
3. Build da aplicação
4. Construção das imagens Docker
5. Publicação da imagem no registry
6. Atualização automática dos containers em produção
7. Rollback automático em caso de falha

Para acionar a pipeline, basta realizar um push:

```bash
git add .
git commit -m "feat: sua mensagem aqui"
git push origin main
```

---

## 🔒 Segurança

- Credenciais e variáveis sensíveis são gerenciadas via arquivo `.env` (não versionado)
- O arquivo `.gitignore` garante que arquivos sensíveis não sejam enviados ao repositório
- Os *secrets* utilizados na pipeline são configurados em **Settings > Secrets** do repositório GitHub
- Nenhuma senha ou chave de acesso está exposta diretamente no código-fonte

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.