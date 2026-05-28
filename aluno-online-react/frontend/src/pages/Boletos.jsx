import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Tabela from "../components/Tabela";

function Boletos() { 
  const colunas = ["Data", "Valor R$", "Situação"];

  const boletos = [
    [
      ["19/01/2026", "500,00", "Pago"],
      ["19/02/2026", "500,00", "Em atraso"],
      ["19/03/2026", "500,00", "Pago"],
      ["19/04/2026", "500,00", "Pago"],
      ["19/05/2026", "500,00", "Pago"],
      ["19/06/2026", "500,00", "A pagar"],
      ["19/07/2026", "500,00", "A pagar"],
      ["19/08/2026", "500,00", "A pagar"],
      ["19/09/2026", "500,00", "A pagar"],
      ["19/10/2026", "500,00", "A pagar"],
      ["19/07/2026", "500,00", "A pagar"],
      ["19/08/2026", "500,00", "A pagar"],
      ["19/09/2026", "500,00", "A pagar"],
      ["19/10/2026", "500,00", "A pagar"],
      ["19/11/2026", "500,00", "A pagar"],
      ["19/12/2026", "500,00", "A pagar"],
      ["19/01/2027", "500,00", "A pagar"],
    ],
  ];

  return (
    <>
      <Main
        titulo="Meus Boletos"
        subtitulo="Histórico de Pagamentos"
      >
        <Tabela colunas={colunas} dados={boletos[0]} />
      </Main>
    </>
  );
}

export default Boletos;