const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash("123456", 10);

  await prisma.usuario.createMany({
    data: [
      { nome: "Hiarley", matricula: "2026001", senha },
      { nome: "Aluno Teste", matricula: "2023002", senha },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());