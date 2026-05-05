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

  // NOVA FUNÇÃO: Deletar conta
  async function handleDelete(id) {
    const confirmar = window.confirm("Tem certeza que deseja apagar esta conta?")
    if (!confirmar) return

    const { error } = await supabase
      .from("contas")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
    } else {
      fetchContas() // Atualiza a tela após deletar
    }
  }

  // NOVA FUNÇÃO: Mudar o status (Pendente <-> Paga)
  async function handleToggleStatus(id, statusAtual) {
    const novoStatus = statusAtual === "pendente" ? "paga" : "pendente"

    const { error } = await supabase
      .from("contas")
      .update({ status: novoStatus })
      .eq("id", id)

    if (error) {
      console.error(error)
    } else {
      fetchContas() // Atualiza a tela após mudar o status
    }
  }

  useEffect(() => {
    fetchContas()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-5xl mx-auto p-6 mt-8">
        <Summary contas={contas} />
        <Form onSave={fetchContas} />
        
        {/* Passamos as novas funções para a Lista */}
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