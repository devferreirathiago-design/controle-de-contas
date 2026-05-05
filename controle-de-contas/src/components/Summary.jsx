export function Summary({ contas }) {
  const total = contas.reduce((acc, conta) => acc + Number(conta.valor), 0)
  
  const pagos = contas
    .filter(conta => conta.status === 'paga')
    .reduce((acc, conta) => acc + Number(conta.valor), 0)

  const pendentes = total - pagos

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <header className="flex items-center justify-between text-slate-500">
          <span>Total do Mês</span>
          <span className="text-xl">💰</span>
        </header>
        <strong className="block mt-4 text-3xl font-bold text-slate-800">{formatCurrency(total)}</strong>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
        <header className="flex items-center justify-between text-slate-500">
          <span>Contas Pagas</span>
          <span className="text-xl">✅</span>
        </header>
        <strong className="block mt-4 text-3xl font-bold text-slate-800">{formatCurrency(pagos)}</strong>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <header className="flex items-center justify-between text-slate-500">
          <span>Pendentes</span>
          <span className="text-xl">⏳</span>
        </header>
        <strong className="block mt-4 text-3xl font-bold text-slate-800">{formatCurrency(pendentes)}</strong>
      </div>
    </div>
  )
}