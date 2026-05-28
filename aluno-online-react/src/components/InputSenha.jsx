function InputSenha({ senha, erro, mudaValor }) {
  return (
    <>
      <label htmlFor="senha" className="mt-5 font-semibold">Senha</label>
      <input
        placeholder="Digite sua Senha"
        className="border border-solid border-gray-900 border-2 p-2 rounded-lg"
        type="password"
        id="senha"
        name="senha"
        value={senha}
        onChange={mudaValor}
      />
      <p className="text-red-700">{erro}</p>
    </>
  );
}
export default InputSenha;
