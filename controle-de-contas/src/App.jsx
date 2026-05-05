import { Header } from "./components/Header"
import { Summary } from "./components/Summary"
// 1. Importar o Form
import { Form } from "./components/Form"

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-5xl mx-auto p-6 mt-8">
        <Summary />
        
        {/* 2. Colocar o Form aqui, substituindo o texto antigo */}
        <Form />
        
      </main>
    </div>
  )
}

export default App