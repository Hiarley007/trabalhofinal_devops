import { Outlet, useNavigate } from "react-router";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Tabela from "../components/Tabela";

function Requerimentos() {
  const colunas = ["Tipo de Requerimento", "Data de Solicitação", "Situação"];
  const navigate = useNavigate();

  const informacoes = [
    [
      ["Revisão de Mensão", "15/12/2025", "Indeferido"],
      ["Dispensa de Disciplina", "12/05/2025", "Indeferido"],
      ["Trancamento de Matrícula", "05/01/2024", "Deferido"],
      ["Mudança de Turno", "10/10/2023", "Deferido"],
      ["Renovação de Matrícula", "20/02/2023", "Deferido"],
      ["Mudança de Turno", "10/10/2023", "Em análise"],
      ["Renovação de Matrícula", "20/02/2023", "Em análise"],
      ["Mudança de Turno", "10/10/2023", "Em análise"],
      ["Renovação de Matrícula", "20/02/2023", "Em análise"],
    ],
  ];

  return (
    <>
      <Main
        titulo="Meus Requerimentos"
        subtitulo="Faça solitações online para Scretária"
        className="flex-1 h-screen md:overflow-hidden"
      >
        <Tabela colunas={colunas} dados={informacoes[0]} />

        <button
          onClick={() => navigate("/novo")}
          className="block ml-auto bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white text-sm font-medium px-4 py-2 mr-4 rounded-lg transition-colors"
        >
          Novo Requerimento
        </button>

        <Outlet />
      </Main>
    </>
  );
}

export default Requerimentos;