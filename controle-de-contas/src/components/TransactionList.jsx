export function TransactionList({ contas, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Minhas Contas</h2>

      {/* VERSÃO MOBILE: Cards que aparecem apenas em telas pequenas */}
      <div className="flex flex-col gap-3 md:hidden">
        {contas.length === 0 && (
          <p className="text-center py-4 text-slate-400">Nenhuma conta cadastrada.</p>
        )}
        
        {contas.map((conta) => (
          <div key={conta.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-900 leading-none">{conta.nome}</h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{conta.tipo}</span>
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase
                ${conta.status === 'paga' ? 'bg-green-500 text-white' : 'bg-amber-400 text-white'}
              `}>
                {conta.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-blue-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.valor)}
                </p>
                <p className="text-[10px] text-slate-400">
                  Vencimento: {new Date(conta.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => onToggleStatus(conta.id, conta.status)}
                  className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-lg shadow-sm active:bg-green-50 text-xl"
                >
                  {conta.status === 'pendente' ? '✅' : '⏳'}
                </button>
                <button 
                  onClick={() => onDelete(conta.id)}
                  className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-lg shadow-sm text-red-500 active:bg-red-50"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VERSÃO DESKTOP: Tabela clássica que aparece apenas em telas médias/grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-widest">
              <th className="pb-3 font-semibold">Nome</th>
              <th className="pb-3 font-semibold">Valor</th>
              <th className="pb-3 font-semibold">Tipo</th>
              <th className="pb-3 font-semibold text-center">Status</th>
              <th className="pb-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 text-slate-800 font-medium">{conta.nome}</td>
                <td className="py-4 text-blue-700 font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.valor)}
                </td>
                <td className="py-4 text-slate-500 text-sm">{conta.tipo}</td>
                <td className="py-4 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase
                    ${conta.status === 'paga' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                  `}>
                    {conta.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => onToggleStatus(conta.id, conta.status)} className="p-2 hover:bg-slate-200 rounded-md transition-colors grayscale hover:grayscale-0">
                      {conta.status === 'pendente' ? '✅' : '⏳'}
                    </button>
                    <button onClick={() => onDelete(conta.id)} className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-md transition-colors">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}