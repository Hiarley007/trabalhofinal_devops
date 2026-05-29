import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import Faltas from "./pages/Faltas";
import Notas from "./pages/Notas";
import Boletos from "./pages/Boletos";
import Requerimentos from "./pages/Requerimentos";
import Login from "./pages/Login";
import Erro404 from "./pages/Erro404";
import Layout from "./layout/Layout";
import useAuth from "./hooks/useAuth";
import RequerimentoForm from "./forms/RequerimentoForm"

function App() {
  const { logado } = useAuth();
  return (
    <Routes>
      {logado ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="notas" element={<Notas />} />
          <Route path="faltas" element={<Faltas />} />
          <Route path="boletos" element={<Boletos />} />
          <Route path="requerimentos" element={<Requerimentos />} />
          <Route path="novo" element={<RequerimentoForm />} />
          <Route path="*" element={<Erro404 />} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;