import { useState } from "react"
import Header from "./Header"
import FormularioImputacion from "./FormularioImputacion"
import ListaImputaciones from "./ListaImputaciones"

export default function Inicio() {
  const [imputaciones, setImputaciones] = useState([])

  const agregarImputacion = (nuevaImputacion) => {
    setImputaciones([...imputaciones, nuevaImputacion])
  }

  return (
    <div className="min-h-screen bg-[#A0CF9F]/10 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col p-4 space-y-4">
        <section className="bg-white rounded-lg shadow-md p-6">
          <FormularioImputacion onAgregarImputacion={agregarImputacion} />
        </section>
        <section className="bg-white rounded-lg shadow-md p-6 flex-grow">
          <ListaImputaciones imputaciones={imputaciones} />
        </section>
      </main>
    </div>
  )
}