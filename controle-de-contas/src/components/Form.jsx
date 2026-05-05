import { useState } from "react"
import { supabase } from "../lib/supabase"

export function Form({ onSave }) {
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nome || !valor || !tipo) return

    const { error } = await supabase.from("contas").insert([{ nome, valor: parseFloat(valor), tipo, status: "pendente" }])
    if (!error) {
      setNome(""); setValor(""); setTipo(""); onSave()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Novo Lançamento</h2>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
        <input type="text" placeholder="Ex: Luz" value={nome} onChange={e => setNome(e.target.value)}
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500" />
        
        <input type="number" step="0.01" placeholder="R$ 0,00" value={valor} onChange={e => setValor(e.target.value)}
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500" />
        
        <select value={tipo} onChange={e => setTipo(e.target.value)}
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 bg-white">
          <option value="">Tipo</option>
          <option value="Fixa">Fixa</option>
          <option value="Variável">Variável</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white font-bold rounded-md p-3 hover:bg-blue-700 transition-all active:scale-95">
          Adicionar
        </button>
      </div>
    </form>
  )
}