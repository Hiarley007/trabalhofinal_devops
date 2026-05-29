import Card from "./Card";
import Topbar from "./Topbar";

function Main(props) {
  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <Topbar titulo={props.titulo} />

        <h2 className="text-lg font-semibold px-8 md:px-10 p-8">
          {props.subtitulo}
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-1 gap-4 p-8 ">{props.children}</section>
      </main>
    </>
  );
}

export default Main;