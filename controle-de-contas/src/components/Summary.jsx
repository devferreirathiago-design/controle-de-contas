export function Summary() {
  return (
    // Usamos Grid para colocar os 3 cartões lado a lado
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Cartão 1: Total */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
        <header className="flex items-center justify-between text-slate-500">
          <span>Total do Mês</span>
          <span className="text-xl">💰</span>
        </header>
        <strong className="block mt-4 text-3xl font-bold text-slate-800">
          R$ 0,00
        </strong>
      </div>

      {/* Cartão 2: Pagas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
        <header className="flex items-center justify-between text-slate-500">
          <span>Contas Pagas</span>
          <span className="text-xl">✅</span>
        </header>
        <strong className="block mt-4 text-3xl font-bold text-slate-800">
          R$ 0,00
        </strong>
      </div>

      {/* Cartão 3: Pendentes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
        <header className="flex items-center justify-between text-slate-500">
          <span>Pendentes</span>
          <span className="text-xl">⏳</span>
        </header>
        <strong className="block mt-4 text-3xl font-bold text-slate-800">
          R$ 0,00
        </strong>
      </div>

    </div>
  )
}