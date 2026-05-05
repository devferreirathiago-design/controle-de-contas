export function Summary({ contas }) {
  const total = contas.reduce((acc, conta) => acc + Number(conta.valor), 0)
  const pagos = contas.filter(c => c.status === 'paga').reduce((acc, c) => acc + Number(c.valor), 0)
  const pendentes = total - pagos

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <header className="flex items-center justify-between text-slate-500 text-sm">
          <span>Total</span>
          <span>💰</span>
        </header>
        <strong className="block mt-2 text-xl md:text-3xl font-bold text-slate-800">{formatCurrency(total)}</strong>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-t-4 border-green-500">
        <header className="flex items-center justify-between text-slate-500 text-sm">
          <span>Pagos</span>
          <span>✅</span>
        </header>
        <strong className="block mt-2 text-xl md:text-3xl font-bold text-slate-800">{formatCurrency(pagos)}</strong>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <header className="flex items-center justify-between text-slate-500 text-sm">
          <span>Pendentes</span>
          <span>⏳</span>
        </header>
        <strong className="block mt-2 text-xl md:text-3xl font-bold text-slate-800">{formatCurrency(pendentes)}</strong>
      </div>
    </div>
  )
}