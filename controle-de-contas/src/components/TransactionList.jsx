export function TransactionList({ contas, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Minhas Contas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-sm">
              <th className="pb-3 font-medium">Nome</th>
              <th className="pb-3 font-medium">Valor</th>
              <th className="pb-3 font-medium">Tipo</th>
              <th className="pb-3 font-medium">Data</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4 text-slate-800 font-medium">{conta.nome}</td>
                <td className="py-4 text-slate-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(conta.valor)}
                </td>
                <td className="py-4 text-slate-600">{conta.tipo}</td>
                <td className="py-4 text-slate-600">
                  {new Date(conta.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold
                    ${conta.status === 'paga' ? 'bg-green-100 text-green-700' : ''}
                    ${conta.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' : ''}
                  `}>
                    {conta.status.toUpperCase()}
                  </span>
                </td>
                
                {/* NOVOS BOTÕES DE AÇÃO */}
                <td className="py-4 flex gap-2 justify-center">
                  <button 
                    onClick={() => onToggleStatus(conta.id, conta.status)}
                    title={conta.status === 'pendente' ? 'Marcar como Paga' : 'Desmarcar'}
                    className="p-2 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    {conta.status === 'pendente' ? '✅' : '⏳'}
                  </button>
                  <button 
                    onClick={() => onDelete(conta.id)}
                    title="Deletar Conta"
                    className="p-2 rounded-md hover:bg-red-100 text-red-500 transition-colors"
                  >
                    🗑️
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}