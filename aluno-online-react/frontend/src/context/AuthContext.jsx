import React, { createContext, useState } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:3001";

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  const [logado, setLogado] = useState(false);
  const [erro, setErro] = useState(null);

  const login = async (matricula, senha) => {
    try {
      // limpa erro anterior
      setErro(null);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricula,
          senha,
        }),
      });

      const data = await response.json();

      // verifica se a resposta deu erro
      if (!response.ok) {
        setErro(data.erro || "Erro ao fazer login.");
        return false;
      }

      // salva token
      localStorage.setItem("token", data.token);

      // salva usuário
      setUsuario(data.usuario);

      // usuário autenticado
      setLogado(true);

      return true;
    } catch (err) {
      console.error("Erro no login:", err);

      setErro(
        err.message || "Não foi possível conectar ao servidor."
      );

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUsuario({});
    setLogado(false);
    setErro(null);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        logado,
        usuario,
        erro,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };