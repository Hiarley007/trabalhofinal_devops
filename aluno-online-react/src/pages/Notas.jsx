import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Tabela from "../components/Tabela";
import Topbar from "../components/Topbar";

function Notas() {
  const colunas = ["Disciplinas", "A1", "A2", "A3", "Menção"];

  const notas = [
    [
      ["BI e DataWarehouse", "", "", "", "SR "],
      ["Construção de Frontend", "", "", "", "SR "],
      ["Manutenção de Softawre e DevOps", "", "", "", "SR "],
    ],

    [
      ["Estrutura de Dados", "5.5", "5.5", "", "SR "], 
      ["Construção de Backend", "0.0", "6.0", "4.0", "SR "],
      ["Gerenciamento de Projetos", "8.0", "9.0", "4.0", "SR "],
    ],

    [
      ["Estrutura de Dados", "5.5", "5.5", "", "SR "],
      ["Construção de Backend", "0.0", "6.0", "4.0", "SR "],
      ["Gerenciamento de Projetos", "8.0", "9.0", "4.0", "SR "],
    ],
  ];
  return (
    <>
      
      <Main titulo="Minhas Notas" subtitulo="Histórico de Notas">
        <Tabela
          titulo="1° Semestre - 2026"
          colunas={colunas}
          dados={notas[0]}
        />
        <Tabela
          titulo="2° Semestre - 2025"
          colunas={colunas}
          dados={notas[1]}
        />
        <Tabela
          titulo="1° Semestre - 2025"
          colunas={colunas}
          dados={notas[2]}
        />
      </Main>
    </>
  );
}

export default Notas;
