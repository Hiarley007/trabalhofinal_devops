function Tabela(props) {
  return (
    <>
    <section className="p-4">
      {props.titulo && (
        <h2 className="text-2xl font-semibold p-2 bg-gray-300 text-center rounded-t-lg border-b border-gray-100">
          {props.titulo}
        </h2>
      )}
        <table className="w-full">
          {/* Cabeçalho */}
          <thead className="bg-gray-300 text-gray-800 p-3">
            <tr className="border border-gray-300">
              {props.colunas.map((item, index) => (
                <th key={index} className="p-3 font-semibold text-center">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corpo */}
          <tbody className="text-gray-900">
            {props.dados.map((linha, i) => {
              const status = linha[2];

              return (
                <tr
                  key={i}
                  className={`
                    border border-gray-300
                    ${i % 2 === 0 ? "bg-gray-100" : ""}
                    ${status === "Pago" ? "text-green-600" : ""}
                    ${status === "Em atraso" ? "text-red-600" : ""}
                    ${status === "Deferido" ? "text-green-600" : ""}
                    ${status === "Indeferido" ? "text-red-600" : ""}
                  `}
                >
                  {linha.map((coluna, j) => (
                    <td
                      key={j}
                      className="p-3 text-center border border-gray-300"
                    >
                      {coluna}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Tabela;
