import { useState } from "react"
import { supabase } from "../lib/supabase"

export function Form({ onSave }) {
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!nome || !valor || !tipo) return

    const { error } = await supabase
      .from("contas")
      .insert([{ nome, valor: parseFloat(valor), tipo, status: "pendente" }])

    if (error) {
      console.error(error)
    } else {
      setNome("")
      setValor("")
      setTipo("")
      onSave()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Cadastrar Nova Conta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input 
          type="text" 
          placeholder="Nome da conta" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 transition-colors"
        />
        <input 
          type="number" 
          step="0.01"
          placeholder="Valor (R$)" 
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 transition-colors"
        />
        <select 
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 bg-white cursor-pointer transition-colors"
        >
          <option value="">Selecione o Tipo</option>
          <option value="Fixa">Despesa Fixa</option>
          <option value="Variável">Despesa Variável</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white font-bold rounded-md p-3 hover:bg-blue-700 transition-colors">
          Adicionar Conta
        </button>
      </div>
    </form>
  )
}