const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { matricula, senha } = req.body;

    if (!matricula || !senha) {
      return res.status(400).json({
        erro: "Matrícula e senha obrigatórias",
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        matricula,
      },
    });

    if (!usuario) {
      return res.status(401).json({
        erro: "Usuário não encontrado",
      });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({
        erro: "Senha inválida",
      });
    }

    return res.status(200).json({
      token: "TOKEN123",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        matricula: usuario.matricula,
      },
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      erro: "Erro interno do servidor",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});