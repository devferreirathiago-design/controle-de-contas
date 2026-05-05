export function TransactionList({ contas, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Minhas Contas</h2>
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Nome</th>
              <th className="pb-3 font-medium">Valor</th>
              <th className="pb-3 font-medium">Data</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id} className="border-b border-slate-100 text-sm">
                <td className="py-4 text-slate-800 font-medium">{conta.nome}</td>
                <td className="py-4 text-slate-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.valor)}
                </td>
                <td className="py-4 text-slate-500 text-xs">
                  {new Date(conta.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                    ${conta.status === 'paga' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                  `}>
                    {conta.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => onToggleStatus(conta.id, conta.status)} className="p-2 hover:bg-slate-100 rounded-lg">
                      {conta.status === 'pendente' ? '✅' : '⏳'}
                    </button>
                    <button onClick={() => onDelete(conta.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
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