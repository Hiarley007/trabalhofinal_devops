import React from "react";
import logo from "../assets/learn.svg";
import FormLogin from "../components/FormLogin";

function Login() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <section className="flex flex-col items-center border border-gray-900 border-2 rounded-md p-10">
        
        <img
          src={logo}
          alt="Imagem da Logo"
          className="w-24 h-24"
        />

        <h1 className="font-bold text-4xl my-6 text-center">
          Aluno Online
        </h1>

        <FormLogin />

      </section>
    </main>
  );
}
 
export default Login;