export function Summary({ contas }) {
  const total = contas.reduce((acc, c) => acc + Number(c.valor), 0)
  const pagos = contas.filter(c => c.status === 'paga').reduce((acc, c) => acc + Number(c.valor), 0)
  const pendentes = total - pagos

  const formatBRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card title="Total Previsto" value={formatBRL(total)} icon="💰" color="blue" />
      <Card title="Total Pago" value={formatBRL(pagos)} icon="✅" color="green" />
      <Card title="Aguardando" value={formatBRL(pendentes)} icon="⏳" color="amber" />
    </div>
  )
}

function Card({ title, value, icon, color }) {
  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    amber: "border-amber-500"
  }
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${colors[color]}`}>
      <header className="flex justify-between text-slate-400 text-xs font-bold uppercase mb-2">
        {title} <span>{icon}</span>
      </header>
      <strong className="text-2xl text-slate-800">{value}</strong>
    </div>
  )
}