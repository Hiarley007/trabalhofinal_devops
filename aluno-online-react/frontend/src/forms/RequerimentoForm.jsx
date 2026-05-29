import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


function RequerimentoForm() {
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSalvar = (formulario) => {
    console.log("chegou aqui", formulario);
    reset();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      navigate("/requerimentos");
    }, 3000);
  };

  const hoje = new Date().toISOString().split("T")[0];

  const validadores = {

  descricao: {
    required: "Descrição é obrigatória",
    minLength: { value: 10, message: "Mínimo de 10 caracteres" },
  },
  selecao: {
    required: "Selecione um tipo de Requerimento",
  },
  dataRequerimento: {
    required: "Data do Requerimento é obrigatória",
    validate: (value) => {
      const dataSelecionada = Date.parse(`${value} 00:00:00 UTC`);
      const dataHoje = Date.parse(`${hoje} 00:00:00 UTC`);

      if (dataSelecionada !== dataHoje) return "A data deve ser a de hoje";

      return true;
    },
  },
};

  return (
    <main className="min-h-screen w-full px-8 py-10">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Novo Requerimento
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Preencha os campos abaixo para enviar sua solicitação.
        </p>
      </header>

      {enviado && (
        <aside className="bg-green-100 border border-green-300 text-green-700 text-sm rounded-lg px-4 py-3 mb-6">
          ✓ Requerimento enviado com sucesso!
        </aside>
      )}

      <form onSubmit={handleSubmit(onSalvar)} className="flex flex-col gap-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
            <label className="text-sm font-medium text-gray-700">
              Tipo de Requerimento
              <span className="text-red-400">*</span>
            </label>

            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("requerimento", validadores.selecao)}
            >
              <option value="">Selecione um tipo...</option>
              <option value="revisao">Revisão de Mensão</option>
              <option value="abono">Dispensa de Disciplina</option>
              <option value="cancelamento">Trancamento de Matrícula</option>
              <option value="transferencia">Renovação de Matrícula</option>
            </select>

            {errors?.requerimento && (
              <small className="text-red-400 text-xs">
                {errors.requerimento.message}
              </small>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
            <label
              htmlFor="dataRequerimento"
              className="text-sm font-medium text-gray-700"
            >
              Data do Requerimento
            </label>

            <input
              type="date"
              id="dataRequerimento"
              defaultValue={hoje}
              readOnly
              tabIndex={-1}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-700 bg-gray-100 cursor-not-allowed focus:outline-none"
              {...register("dataRequerimento", validadores.dataRequerimento)}
            />

            {errors?.dataRequerimento && (
              <small className="text-red-400 text-xs">
                {errors.dataRequerimento.message}
              </small>
            )}
          </fieldset>
        </section>

        <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
          <label className="text-sm font-medium text-gray-700">
            Descrição <span className="text-red-400">*</span>
          </label>

          <textarea
            id="descricao"
            rows={10}
            placeholder="Descreva com mais detalhes a solicitação ao seu Requerimento"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
            {...register("descricao", validadores.descricao)}
          />

          {errors?.descricao && (
            <small className="text-red-400 text-xs">
              {errors.descricao.message}
            </small>
          )}
        </fieldset>

        <footer className="flex gap-2">
          <button
            type="submit"
            className="w-full md:w-auto md:px-8 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white text-sm font-medium py-3 rounded-lg transition-colors"
          >
            Enviar
          </button>

          <button
            type="button"
            onClick={() => navigate("/requerimentos")}
            className="w-full md:w-auto md:px-8 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white text-sm font-medium py-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </footer>
      </form>
    </main>
  );
}

export default RequerimentoForm;