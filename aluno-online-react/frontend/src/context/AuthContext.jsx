import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  const [logado, setLogado] = useState(false);

  const login = () => {
    setUsuario({ nome: "Hiarley"});
    setLogado(true);
  };

  const logout = () => {
    setUsuario({});
    setLogado(false);
  };

  return (
    <AuthContext.Provider value={{ logado, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}



export { AuthContext, AuthProvider };

