import React from "react"
function Card(props) {
  return (
    <>
      <section className="max-h-screen grid grid-cols-1 md:grid-cols-2 max-w-screen">
        <article className="bg-white border border-5px border-solid border-gray-300 rounded-t-lg md:col-span-2 pb-8">
          <h3 className="md:block rounded-t-lg p-3 bg-gray-300">
            <strong>{props.titulo}</strong>
          </h3>
          <ul className="space-y-2 p-2">
            {props.itens.map((item, index) => (
              <li key={index} className="border-b border-gray-200 py-2">{item}</li>
            ))}

          </ul>
        </article>
      </section>
    </>
  );
}

export default Card;