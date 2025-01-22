import Header from "./Header"
import FormularioImputacion from "./FormularioImputacion"
import ListaImputaciones from "./ListaImputaciones"

export default function Inicio({ userId, userName }) {
  return (
    <div className="min-h-screen bg-[#A0CF9F]/10 flex flex-col">
      <Header userName={userName} />
      <main className="flex-grow flex flex-col p-4 space-y-4">
        <section className="bg-white rounded-lg shadow-md p-6">
          <FormularioImputacion userId={userId} userName={userName} />
        </section>
        <section className="bg-white rounded-lg shadow-md p-6 flex-grow">
          <ListaImputaciones userId={userId} />
        </section>
      </main>
    </div>
  )
}