export function Header() {
  return (
    <header className="bg-white shadow-sm p-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo/Título */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">💳</span>
          <h1 className="text-2xl font-bold text-slate-800">
            Controle de Contas
          </h1>
        </div>

        {/* Lado Direito: Informação de Perfil ou Status */}
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Painel Financeiro
        </span>

      </div>
    </header>
  )
}