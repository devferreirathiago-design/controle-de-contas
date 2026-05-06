import React, { useState } from "react" // Importamos o React para usar o cloneElement
import { supabase } from "../lib/supabase"

export function Form({ onSave }) {
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [tipo, setTipo] = useState("")
  const [dataVencimento, setDataVencimento] = useState(new Date().toISOString().substring(0, 10))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nome || !valor || !tipo || !dataVencimento) return

    const { error } = await supabase.from("contas").insert([
      { nome, valor: parseFloat(valor), tipo, data_vencimento: dataVencimento, status: "pendente" }
    ])

    if (!error) {
      setNome(""); setValor(""); setTipo(""); onSave()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-sm mb-8 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Field label="Descrição"><input type="text" placeholder="Ex: Internet" value={nome} onChange={e => setNome(e.target.value)} /></Field>
        <Field label="Valor R$"><input type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} /></Field>
        <Field label="Vencimento"><input type="date" value={dataVencimento} onChange={e => setDataVencimento(e.target.value)} /></Field>
        <Field label="Categoria">
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="">Tipo</option>
            <option value="Fixa">Fixa</option>
            <option value="Variável">Variável</option>
          </select>
        </Field>
        <button type="submit" className="h-[46px] bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-all self-end shadow-md shadow-blue-100">
          Lançar
        </button>
      </div>
    </form>
  )
}

// O componente Field ajuda a não repetir código de label e estilo de input
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{label}</label>
      {/* CORREÇÃO AQUI: Mudamos de Object.cloneElement para React.cloneElement */}
      {React.cloneElement(children, { 
        className: "w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50 text-slate-700 transition-all" 
      })}
    </div>
  )
}