// ============================================================
//  ALUNO ONLINE -- server.js
//  Node.js + Express + PostgreSQL
// ============================================================

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const { Pool } = require('pg');

const app  = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'troque_este_segredo_em_producao';

// ── Banco de dados ───────────────────────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME     || 'aluno_online',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// ── Middlewares ──────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// ── Middleware de autenticação JWT ───────────────────────────
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: 'Token não informado.' });

  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

// Middleware: apenas admins
function soAdmin(req, res, next) {
  if (req.user.perfil !== 'admin')
    return res.status(403).json({ erro: 'Acesso restrito a administradores.' });
  next();
}

// ============================================================
//  ROTAS DE AUTENTICAÇÃO
// ============================================================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha)
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });

  try {
    const { rows } = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND ativo = TRUE',
      [email]
    );
    if (!rows.length) return res.status(401).json({ erro: 'Credenciais inválidas.' });

    const usuario = rows[0];
    const ok = await bcrypt.compare(senha, usuario.senha_hash);
    if (!ok) return res.status(401).json({ erro: 'Credenciais inválidas.' });

    // Busca matricula se for aluno
    let matricula = null;
    let aluno_id  = null;
    if (usuario.perfil === 'aluno') {
      const { rows: aRows } = await pool.query(
        'SELECT id, matricula FROM alunos WHERE usuario_id = $1',
        [usuario.id]
      );
      if (aRows.length) { matricula = aRows[0].matricula; aluno_id = aRows[0].id; }
    }

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil, aluno_id, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email,
                 perfil: usuario.perfil, matricula, aluno_id }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno.' });
  }
});

// ============================================================
//  ROTAS DE NOTAS
// ============================================================

// GET /api/notas  →  notas do aluno logado
app.get('/api/notas', auth, async (req, res) => {
  const aluno_id = req.user.aluno_id;
  if (!aluno_id) return res.status(403).json({ erro: 'Acesso negado.' });

  try {
    const { rows } = await pool.query(
      `SELECT n.id, d.nome AS disciplina, d.codigo, n.bimestre, n.valor, n.lancado_em
       FROM notas n
       JOIN disciplinas d ON d.id = n.disciplina_id
       WHERE n.aluno_id = $1
       ORDER BY d.nome, n.bimestre`,
      [aluno_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar notas.' });
  }
});

// GET /api/notas/:aluno_id  →  admin consulta notas de qualquer aluno
app.get('/api/notas/:aluno_id', auth, soAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT n.id, d.nome AS disciplina, d.codigo, n.bimestre, n.valor, n.lancado_em
       FROM notas n
       JOIN disciplinas d ON d.id = n.disciplina_id
       WHERE n.aluno_id = $1
       ORDER BY d.nome, n.bimestre`,
      [req.params.aluno_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar notas.' });
  }
});

// POST /api/notas  →  admin lança nota
app.post('/api/notas', auth, soAdmin, async (req, res) => {
  const { aluno_id, disciplina_id, bimestre, valor } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO notas (aluno_id, disciplina_id, bimestre, valor)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (aluno_id, disciplina_id, bimestre)
       DO UPDATE SET valor = EXCLUDED.valor, lancado_em = NOW()
       RETURNING *`,
      [aluno_id, disciplina_id, bimestre, valor]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao lançar nota.' });
  }
});

// ============================================================
//  ROTAS DE FALTAS
// ============================================================

// GET /api/faltas
app.get('/api/faltas', auth, async (req, res) => {
  const aluno_id = req.user.aluno_id;
  if (!aluno_id) return res.status(403).json({ erro: 'Acesso negado.' });

  try {
    const { rows } = await pool.query(
      `SELECT f.id, d.nome AS disciplina, f.data_falta, f.justificada, f.observacao
       FROM faltas f
       JOIN disciplinas d ON d.id = f.disciplina_id
       WHERE f.aluno_id = $1
       ORDER BY f.data_falta DESC`,
      [aluno_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar faltas.' });
  }
});

// GET /api/faltas/resumo  →  total de faltas por disciplina
app.get('/api/faltas/resumo', auth, async (req, res) => {
  const aluno_id = req.user.aluno_id;
  if (!aluno_id) return res.status(403).json({ erro: 'Acesso negado.' });

  try {
    const { rows } = await pool.query(
      `SELECT d.nome AS disciplina, d.carga_hora,
              COUNT(*) AS total_faltas,
              ROUND(COUNT(*) * 100.0 / NULLIF(d.carga_hora,0), 1) AS percentual
       FROM faltas f
       JOIN disciplinas d ON d.id = f.disciplina_id
       WHERE f.aluno_id = $1
       GROUP BY d.nome, d.carga_hora
       ORDER BY d.nome`,
      [aluno_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar resumo de faltas.' });
  }
});

// POST /api/faltas  →  admin registra falta
app.post('/api/faltas', auth, soAdmin, async (req, res) => {
  const { aluno_id, disciplina_id, data_falta, justificada, observacao } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO faltas (aluno_id, disciplina_id, data_falta, justificada, observacao)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (aluno_id, disciplina_id, data_falta) DO NOTHING
       RETURNING *`,
      [aluno_id, disciplina_id, data_falta, justificada ?? false, observacao ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar falta.' });
  }
});

// ============================================================
//  ROTAS DE BOLETOS
// ============================================================

// GET /api/boletos
app.get('/api/boletos', auth, async (req, res) => {
  const aluno_id = req.user.aluno_id;
  if (!aluno_id) return res.status(403).json({ erro: 'Acesso negado.' });

  try {
    const { rows } = await pool.query(
      `SELECT id, descricao, valor, vencimento, status, codigo_barra, pago_em, criado_em
       FROM boletos
       WHERE aluno_id = $1
       ORDER BY vencimento DESC`,
      [aluno_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar boletos.' });
  }
});

// PATCH /api/boletos/:id/pagar  →  marca boleto como pago
app.patch('/api/boletos/:id/pagar', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `UPDATE boletos
       SET status = 'pago', pago_em = NOW()
       WHERE id = $1 AND aluno_id = $2
       RETURNING *`,
      [req.params.id, req.user.aluno_id]
    );
    if (!rows.length) return res.status(404).json({ erro: 'Boleto não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar boleto.' });
  }
});

// POST /api/boletos  →  admin cria boleto
app.post('/api/boletos', auth, soAdmin, async (req, res) => {
  const { aluno_id, descricao, valor, vencimento, codigo_barra } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO boletos (aluno_id, descricao, valor, vencimento, codigo_barra)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [aluno_id, descricao, valor, vencimento, codigo_barra ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar boleto.' });
  }
});

// ============================================================
//  ROTAS DE DASHBOARD
// ============================================================

// GET /api/dashboard  →  resumo geral do aluno logado
app.get('/api/dashboard', auth, async (req, res) => {
  const aluno_id = req.user.aluno_id;
  if (!aluno_id) return res.status(403).json({ erro: 'Acesso negado.' });

  try {
    const [notas, faltas, boletos] = await Promise.all([
      pool.query(
        `SELECT ROUND(AVG(valor),2) AS media_geral,
                COUNT(*) AS total_notas
         FROM notas WHERE aluno_id = $1`, [aluno_id]),

      pool.query(
        `SELECT COUNT(*) AS total_faltas FROM faltas WHERE aluno_id = $1`, [aluno_id]),

      pool.query(
        `SELECT COUNT(*) FILTER (WHERE status='pendente') AS pendentes,
                COALESCE(SUM(valor) FILTER (WHERE status='pendente'),0) AS valor_pendente
         FROM boletos WHERE aluno_id = $1`, [aluno_id]),
    ]);

    res.json({
      media_geral:    notas.rows[0].media_geral,
      total_notas:    notas.rows[0].total_notas,
      total_faltas:   faltas.rows[0].total_faltas,
      boletos_pendentes: boletos.rows[0].pendentes,
      valor_pendente:    boletos.rows[0].valor_pendente,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao montar dashboard.' });
  }
});

// ============================================================
//  ROTAS DE ALUNOS (admin)
// ============================================================

// GET /api/alunos
app.get('/api/alunos', auth, soAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT a.id, a.matricula, u.nome, u.email, a.telefone, a.data_nasc, a.criado_em
       FROM alunos a
       JOIN usuarios u ON u.id = a.usuario_id
       ORDER BY u.nome`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar alunos.' });
  }
});

// POST /api/alunos  →  cadastra aluno + usuário
app.post('/api/alunos', auth, soAdmin, async (req, res) => {
  const { nome, email, senha, matricula, data_nasc, telefone, endereco } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const hash = await bcrypt.hash(senha, 10);
    const { rows: uRows } = await client.query(
      `INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES ($1,$2,$3,'aluno') RETURNING *`,
      [nome, email, hash]
    );
    const { rows: aRows } = await client.query(
      `INSERT INTO alunos (usuario_id, matricula, data_nasc, telefone, endereco)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [uRows[0].id, matricula, data_nasc, telefone, endereco]
    );
    await client.query('COMMIT');
    res.status(201).json({ usuario: uRows[0], aluno: aRows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar aluno.' });
  } finally {
    client.release();
  }
});

// ============================================================
//  ROTAS DE DISCIPLINAS
// ============================================================

// GET /api/disciplinas
app.get('/api/disciplinas', auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT d.id, d.nome, d.codigo, d.carga_hora, t.nome AS turma
       FROM disciplinas d
       LEFT JOIN turmas t ON t.id = d.turma_id
       ORDER BY d.nome`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar disciplinas.' });
  }
});

// ============================================================
//  HEALTH CHECK
// ============================================================
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'conectado', hora: new Date() });
  } catch {
    res.status(503).json({ status: 'erro', db: 'desconectado' });
  }
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Servidor rodando em http://localhost:${PORT}`);
});