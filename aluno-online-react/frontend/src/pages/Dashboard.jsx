import { useContext } from "react";
import Card from "../components/Card";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { usuario } = useContext(AuthContext);

  const avisos = [
    "Eleição para representante de Turma",
    "Inscrição para Projeto de Extensão",
  ];

  const datas = [
    "23/02 - Início do Período Letivo 2026/1",
    "25/04 - Prazo Final para Aplicação da P1",
    "23/06 - Prazo Final para Aplicação P2",
    "04/07 - Fim do Período Letivo 2026/1",
  ];

  const disciplinas = [
    "Construção de Frontend",
    "Manutenção de Software e DevOps",
    "BI e Data Warehouse",
  ];

  return (
    <>
      <Main
        titulo={`Olá, ${usuario.nome}!`}
        subtitulo="Bem-vindo ao Portal do Aluno"
      >
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-8">
          <Card titulo="Mural de Avisos" itens={avisos} />
          <Card titulo="Calendário Acadêmico" itens={datas} />
          <Card titulo="Minhas Disciplinas" itens={disciplinas} />
          <Card titulo="Minhas Disciplinas" itens={disciplinas} />
        </section>
      </Main>
    </>
  );
}

export default Dashboard;