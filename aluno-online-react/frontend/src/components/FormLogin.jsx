import { useState } from "react";
import { useNavigate } from "react-router"; 
import InputMatricula from "./InputMatricula";
import InputSenha from "./InputSenha";
import InputSubmit from "./InputSubmit";
import useAuth from "../hooks/useAuth";


function FormLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState();
  const [senha, setSenha] = useState();
  const [matriculaErro, setMatriculaErro] = useState();
  const [senhaErro, setSenhaErro] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    let validacao = true;

    setMatriculaErro("");
    setSenhaErro("");

    if (!matricula) {
      setMatriculaErro("Matrícula é obrigatória");
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
      login({ username: matricula, password: senha }); // usa os valores do form
      navigate("/"); // redireciona após login
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:w-100">
      <InputMatricula
        matricula={matricula}
        erro={matriculaErro}
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