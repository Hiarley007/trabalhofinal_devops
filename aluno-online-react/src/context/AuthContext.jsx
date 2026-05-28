import { createContext, useState } from "react";
import axios from "axios";
 
const AuthContext = createContext();
 
const API = "http://localhost:3001";
 
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({});
  const [logado, setLogado] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
 
  const login = async (email, senha) => {
    setCarregando(true);
    setErro("");
    try {
      const { data } = await axios.post(`${API}/login`, { email, senha });
      setUsuario(data.usuario);   // { id, nome, email, perfil, matricula… }
      setLogado(true);
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao fazer login");
    } finally {
      setCarregando(false);
    }
  };
 
  const logout = () => {
    setUsuario({});
    setLogado(false);
    setErro("");
  };
 
  return (
    <AuthContext.Provider value={{ logado, usuario, login, logout, erro, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export { AuthContext, AuthProvider };