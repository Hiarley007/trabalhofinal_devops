import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Tabela from "../components/Tabela";
import Topbar from "../components/Topbar";

function Faltas() {
  const colunas = ["Disciplinas", "Total de Faltas", "% de Presença"];

  const faltas = [
    [
      ["BI e DataWarehouse", "0", "100%"],
      ["Construção de Frontend", "0", "100%"],
      ["Manutenção de Softawre e DevOps", "0", "100%"],
    ],

    [
      ["Estrutura de Dados", "0", "100%"],
      ["Construção de Backend", "0", "100%"],
      ["Gerenciamento de Projetos", "0", "100%"],
    ],

    [
      ["Estrutura de Dados", "0", "100%"],
      ["Construção de Backend", "0", "100%"],
      ["Gerenciamento de Projetos", "0", "100%"],
    ],
  ];
  return (
    <>
      <Main titulo="Minhas Faltas" subtitulo="Histórico de Faltas">
        <Tabela
          titulo="1° Semestre - 2026"
          colunas={colunas}
          dados={faltas[0]}
        />
        <Tabela 
          titulo="2° Semestre - 2025"
          colunas={colunas}
          dados={faltas[1]}
        />
        <Tabela
          titulo="1° Semestre - 2025"
          colunas={colunas}
          dados={faltas[2]}
        />
      </Main>
    </>
  );
}

export default Faltas;
