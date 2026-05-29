-- ============================================================
--  ALUNO ONLINE -- init.sql
--  Sistema Escolar: Alunos, Turmas, Disciplinas, Notas,
--  Faltas e Boletos
-- ============================================================

-- Extensão para UUIDs (opcional, mas recomendada)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- 1. USUÁRIOS (login/autenticação)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(120)        NOT NULL,
    email       VARCHAR(120) UNIQUE NOT NULL,
    senha_hash  VARCHAR(255)        NOT NULL,                 -- bcrypt
    perfil      VARCHAR(20)         NOT NULL DEFAULT 'aluno', -- aluno | admin
    ativo       BOOLEAN             NOT NULL DEFAULT TRUE,
    criado_em   TIMESTAMP           NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 2. ALUNOS (dados acadêmicos vinculados ao usuário)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alunos (
    id           SERIAL PRIMARY KEY,
    usuario_id   INT  NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    matricula    VARCHAR(20) UNIQUE NOT NULL,
    data_nasc    DATE,
    telefone     VARCHAR(20),
    endereco     TEXT,
    criado_em    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 3. TURMAS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS turmas (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(80)  NOT NULL,   -- ex.: "3º Ano A - 2026"
    ano         INT          NOT NULL,
    semestre    SMALLINT     NOT NULL DEFAULT 1, -- 1 ou 2
    ativo       BOOLEAN      NOT NULL DEFAULT TRUE
);

-- ------------------------------------------------------------
-- 4. MATRÍCULAS (aluno ↔ turma)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS matriculas (
    id         SERIAL PRIMARY KEY,
    aluno_id   INT  NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    turma_id   INT  NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    data_mat   DATE NOT NULL DEFAULT CURRENT_DATE,
    situacao   VARCHAR(20) NOT NULL DEFAULT 'ativo', -- ativo | trancado | concluido
    UNIQUE (aluno_id, turma_id)
);

-- ------------------------------------------------------------
-- 5. DISCIPLINAS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS disciplinas (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(120) NOT NULL,
    codigo      VARCHAR(20)  UNIQUE NOT NULL,
    carga_hora  INT          NOT NULL DEFAULT 60,
    turma_id    INT          REFERENCES turmas(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- 6. NOTAS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notas (
    id             SERIAL PRIMARY KEY,
    aluno_id       INT            NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    disciplina_id  INT            NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
    bimestre       SMALLINT       NOT NULL CHECK (bimestre BETWEEN 1 AND 4),
    valor          NUMERIC(5,2)   NOT NULL CHECK (valor BETWEEN 0 AND 10),
    lancado_em     TIMESTAMP      NOT NULL DEFAULT NOW(),
    UNIQUE (aluno_id, disciplina_id, bimestre)
);

-- ------------------------------------------------------------
-- 7. FALTAS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faltas (
    id             SERIAL PRIMARY KEY,
    aluno_id       INT       NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    disciplina_id  INT       NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
    data_falta     DATE      NOT NULL,
    justificada    BOOLEAN   NOT NULL DEFAULT FALSE,
    observacao     TEXT,
    UNIQUE (aluno_id, disciplina_id, data_falta)
);

-- ------------------------------------------------------------
-- 8. BOLETOS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS boletos (
    id             SERIAL PRIMARY KEY,
    aluno_id       INT            NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    descricao      VARCHAR(160)   NOT NULL,           -- ex.: "Mensalidade Maio/2026"
    valor          NUMERIC(10,2)  NOT NULL,
    vencimento     DATE           NOT NULL,
    status         VARCHAR(20)    NOT NULL DEFAULT 'pendente', -- pendente | pago | vencido
    codigo_barra   VARCHAR(60),
    pago_em        TIMESTAMP,
    criado_em      TIMESTAMP      NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES PARA DESEMPENHO
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_notas_aluno        ON notas(aluno_id);
CREATE INDEX IF NOT EXISTS idx_notas_disciplina   ON notas(disciplina_id);
CREATE INDEX IF NOT EXISTS idx_faltas_aluno       ON faltas(aluno_id);
CREATE INDEX IF NOT EXISTS idx_faltas_disciplina  ON faltas(disciplina_id);
CREATE INDEX IF NOT EXISTS idx_boletos_aluno      ON boletos(aluno_id);
CREATE INDEX IF NOT EXISTS idx_boletos_status     ON boletos(status);
CREATE INDEX IF NOT EXISTS idx_matriculas_aluno   ON matriculas(aluno_id);

-- ============================================================
-- DADOS DE EXEMPLO (seed)
-- ============================================================

-- Admin
INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
  ('Administrador', 'admin@escola.com', '$2b$10$ExemploHashAdminAqui1234567890', 'admin')
ON CONFLICT DO NOTHING;

-- Alunos
INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
  ('João Silva',    'joao@escola.com',   '$2b$10$ExemploHashAluno1234567890ab', 'aluno'),
  ('Maria Souza',   'maria@escola.com',  '$2b$10$ExemploHashAluno1234567890cd', 'aluno'),
  ('Carlos Mendes', 'carlos@escola.com', '$2b$10$ExemploHashAluno1234567890ef', 'aluno')
ON CONFLICT DO NOTHING;

-- Registros de alunos
INSERT INTO alunos (usuario_id, matricula, data_nasc, telefone) VALUES
  (2, '2026001', '2005-03-12', '(61) 99001-0001'),
  (3, '2026002', '2005-07-24', '(61) 99001-0002'),
  (4, '2026003', '2004-11-30', '(61) 99001-0003')
ON CONFLICT DO NOTHING;

-- Turma
INSERT INTO turmas (nome, ano, semestre) VALUES
  ('3º Ano A - 2026', 2026, 1)
ON CONFLICT DO NOTHING;

-- Matrículas
INSERT INTO matriculas (aluno_id, turma_id) VALUES
  (1, 1), (2, 1), (3, 1)
ON CONFLICT DO NOTHING;

-- Disciplinas
INSERT INTO disciplinas (nome, codigo, carga_hora, turma_id) VALUES
  ('Matemática',       'MAT01', 80, 1),
  ('Português',        'POR01', 80, 1),
  ('História',         'HIS01', 60, 1),
  ('Ciências',         'CIE01', 60, 1),
  ('Educação Física',  'EDF01', 40, 1)
ON CONFLICT DO NOTHING;

-- Notas (João Silva - aluno_id = 1)
INSERT INTO notas (aluno_id, disciplina_id, bimestre, valor) VALUES
  (1, 1, 1, 8.5), (1, 1, 2, 7.0),
  (1, 2, 1, 9.0), (1, 2, 2, 8.0),
  (1, 3, 1, 6.5), (1, 3, 2, 7.5),
  (1, 4, 1, 8.0), (1, 4, 2, 9.0),
  (1, 5, 1, 10.0),(1, 5, 2, 9.5)
ON CONFLICT DO NOTHING;

-- Faltas (João Silva)
INSERT INTO faltas (aluno_id, disciplina_id, data_falta, justificada) VALUES
  (1, 1, '2026-03-10', FALSE),
  (1, 2, '2026-03-15', TRUE),
  (1, 3, '2026-04-02', FALSE),
  (1, 4, '2026-04-20', FALSE)
ON CONFLICT DO NOTHING;

-- Boletos (João Silva)
INSERT INTO boletos (aluno_id, descricao, valor, vencimento, status, codigo_barra) VALUES
  (1, 'Mensalidade Fevereiro/2026', 850.00, '2026-02-10', 'pago',     '23790.00000 00000.000000 00000.000000 1 00000000085000'),
  (1, 'Mensalidade Março/2026',     850.00, '2026-03-10', 'pago',     '23790.00000 00000.000000 00000.000001 1 00000000085000'),
  (1, 'Mensalidade Abril/2026',     850.00, '2026-04-10', 'pago',     '23790.00000 00000.000000 00000.000002 1 00000000085000'),
  (1, 'Mensalidade Maio/2026',      850.00, '2026-05-10', 'pendente', '23790.00000 00000.000000 00000.000003 1 00000000085000'),
  (1, 'Mensalidade Junho/2026',     850.00, '2026-06-10', 'pendente', '23790.00000 00000.000000 00000.000004 1 00000000085000')
ON CONFLICT DO NOTHING;