import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputMatricula from "./InputMatricula";
import InputSenha from "./InputSenha";
import InputSubmit from "./InputSubmit";
import useAuth from "../hooks/useAuth";

function FormLogin() {
  const { login, erro } = useAuth();
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [emailErro, setMatriculaErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validacao = true;
    setMatriculaErro("");
    setSenhaErro("");

    if (!matricula) {
      setMatriculaErro("Email é obrigatório");
      validacao = false;
    }

    if (!senha) {
      setSenhaErro("Senha é obrigatória");
      validacao = false;
    } else if (senha.length < 6) {
      setSenhaErro("A senha deve ter no mínimo 6 caracteres");
      validacao = false;
    }

    if (validacao) {
      const ok = await login(matricula, senha);
      if (ok) navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:w-96">
      {erro && (
        <p className="text-red-500 text-sm mb-2 text-center">{erro}</p>
      )}
      <InputMatricula
        matricula={matricula}
        erro={emailErro}
        mudaValor={(e) => setMatricula(e.target.value)}
      />
      <InputSenha
        senha={senha}
        erro={senhaErro}
        mudaValor={(e) => setSenha(e.target.value)}
      />
      <InputSubmit texto="Entrar" />
    </form>
  );
}

export default FormLogin;