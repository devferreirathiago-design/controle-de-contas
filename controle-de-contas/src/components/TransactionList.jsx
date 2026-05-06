export function TransactionList({ contas, onDelete, onToggleStatus }) {
  
  // Tratamento de string para evitar erros de fuso horário do objeto Date
  const formatDate = (isoDate) => {
    const [y, m, d] = isoDate.split('-')
    return `${d}/${m}/${y}`
  }

  const formatBRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Detalhamento</h2>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-3">
        {contas.map(c => (
          <div key={c.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-900">{c.nome}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shadow-sm ${c.status === 'paga' ? 'bg-green-500' : 'bg-amber-400'}`}>{c.status}</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-lg font-black text-blue-700">{formatBRL(c.valor)}</p>
                <p className="text-[10px] text-slate-400">Vencimento: {formatDate(c.data_vencimento)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onToggleStatus(c.id, c.status)} className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm">{c.status === 'pendente' ? '✅' : '⏳'}</button>
                <button onClick={() => onDelete(c.id)} className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm text-red-500">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100">
              <th className="pb-4">Descrição</th>
              <th className="pb-4">Valor</th>
              <th className="pb-4">Data</th>
              <th className="pb-4 text-center">Status</th>
              <th className="pb-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {contas.map(c => (
              <tr key={c.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-semibold text-slate-700">{c.nome}</td>
                <td className="py-4 text-blue-700 font-black">{formatBRL(c.valor)}</td>
                <td className="py-4 text-slate-500 text-sm">{formatDate(c.data_vencimento)}</td>
                <td className="py-4 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${c.status === 'paga' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
                </td>
                <td className="py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onToggleStatus(c.id, c.status)} className="p-2 hover:bg-slate-200 rounded-lg">{c.status === 'pendente' ? '✅' : '⏳'}</button>
                  <button onClick={() => onDelete(c.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg ml-1">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {contas.length === 0 && <p className="text-center py-10 text-slate-300 font-medium italic">Nenhum registro encontrado para este período.</p>}
    </div>
  )
}