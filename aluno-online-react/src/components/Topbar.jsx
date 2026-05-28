import avatar from "../assets/avatar.svg";

function Topbar(props) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 md:px-6 p-6 w-full">
        <h1 className="text-lg pl-4 font-semibold">{props.titulo}</h1>

        <img src={avatar} alt="imagem do avatar" className="w-10 h-10" />
      </header>
    </>
  );
}

export default Topbar;
