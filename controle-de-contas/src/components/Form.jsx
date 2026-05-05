export function Form() {
  return (
    <form className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Cadastrar Nova Conta</h2>
      
      {/* Container dos inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Campo 1: Nome da Conta */}
        <input 
          type="text" 
          placeholder="Nome da conta (ex: Luz)" 
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 transition-colors"
        />

        {/* Campo 2: Valor */}
        <input 
          type="number" 
          placeholder="Valor (R$)" 
          className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 transition-colors"
        />

        {/* Campo 3: Tipo de Despesa */}
        <select className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500 bg-white cursor-pointer transition-colors">
          <option value="">Selecione o Tipo</option>
          <option value="fixa">Despesa Fixa</option>
          <option value="variavel">Despesa Variável</option>
        </select>

        {/* Botão de Adicionar */}
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold rounded-md p-3 hover:bg-blue-700 transition-colors"
        >
          Adicionar Conta
        </button>

      </div>
    </form>
  )
}