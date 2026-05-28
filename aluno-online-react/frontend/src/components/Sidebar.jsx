import logo from "../assets/learn.svg";
import Menu from "./Menu";

function Sidebar() {
  return (
    <>
      <aside className=" hidden md:flex flex-col w-100 min-h-screen bg-gray-300 border-r border-gray-300 md:overflow-hidden">
        <header className="flex items-center gap-4 p-6 border-b border-gray-100">
          <img src={logo} alt="imagem do logo" className="w-20 h-10" />
          <h1 className="text-lg font-semibold">Aluno Online</h1>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Menu/>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;