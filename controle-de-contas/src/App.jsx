import { useState, useEffect } from "react"
import { supabase } from "./lib/supabase"
import { Header } from "./components/Header"
import { Summary } from "./components/Summary"
import { Form } from "./components/Form"
import { TransactionList } from "./components/TransactionList"

function App() {
  const [contas, setContas] = useState([])

  async function fetchContas() {
    const { data, error } = await supabase
      .from("contas")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setContas(data)
    }
  }

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja apagar esta conta?")
    if (!confirmar) return

    const { error } = await supabase.from("contas").delete().eq("id", id)
    if (!error) fetchContas()
  }

  async function handleToggleStatus(id, statusAtual) {
    const novoStatus = statusAtual === "pendente" ? "paga" : "pendente"
    const { error } = await supabase.from("contas").update({ status: novoStatus }).eq("id", id)
    if (!error) fetchContas()
  }

  useEffect(() => {
    fetchContas()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4 md:mt-8">
        <Summary contas={contas} />
        <Form onSave={fetchContas} />
        <TransactionList 
          contas={contas} 
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </main>
    </div>
  )
}

export default App