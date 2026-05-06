import { useState, useEffect, useCallback } from "react"
import { supabase } from "./lib/supabase"
import { Header } from "./components/Header"
import { Summary } from "./components/Summary"
import { Form } from "./components/Form"
import { TransactionList } from "./components/TransactionList"

function App() {
  const [contas, setContas] = useState([])
  const [mesFiltro, setMesFiltro] = useState(new Date().toISOString().substring(0, 7))

  /**
   * Busca otimizada: Filtramos do dia 01 do mês atual até o dia 01 do próximo mês.
   * O uso do operador .lt (menor que) evita problemas com meses de 28, 30 ou 31 dias.
   */
  const fetchContas = useCallback(async () => {
    const inicio = `${mesFiltro}-01`
    
    const [ano, mes] = mesFiltro.split('-').map(Number)
    const proximoMes = mes === 12 ? 1 : mes + 1
    const proximoAno = mes === 12 ? ano + 1 : ano
    const fim = `${proximoAno}-${String(proximoMes).padStart(2, '0')}-01`

    const { data, error } = await supabase
      .from("contas")
      .select("*")
      .gte("data_vencimento", inicio)
      .lt("data_vencimento", fim)
      .order("data_vencimento", { ascending: true })

    if (error) {
      console.error("Falha na sincronização:", error.message)
      return
    }
    setContas(data)
  }, [mesFiltro])

  async function handleDelete(id) {
    if (!confirm("Excluir este lançamento permanentemente?")) return
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
  }, [fetchContas])

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <Header />
      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        
        {/* Seletor de Período */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-slate-800 font-bold text-lg hidden md:block">Gestão Mensal</h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-slate-500 text-sm font-medium">Mês de Referência:</span>
            <input 
              type="month" 
              value={mesFiltro}
              onChange={(e) => setMesFiltro(e.target.value)}
              className="flex-1 md:flex-none bg-slate-50 border border-slate-200 rounded-lg p-2 text-blue-600 font-bold outline-none focus:ring-2 ring-blue-500"
            />
          </div>
        </div>

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