const request = require("supertest");
const app = require("../server");

describe("Health Check", () => {
  test("deve retornar status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("Login", () => {
  test("deve retornar erro quando não enviar credenciais", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe("Matrícula e senha obrigatórias");
  });
});