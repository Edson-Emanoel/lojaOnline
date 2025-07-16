// Local: src/app/(protected)/dashboard/page.tsx

export default function DashboardPage() {
      return (
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Seu Resumo</h1>
              <p className="mt-1 text-md text-gray-600">
                Confira o desempenho da sua loja neste mês de julho.
              </p>
            </header>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Quantidade de Produtos */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Meus Produtos</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
              </div>
    
              {/* Card 2: Vendas no Mês */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Vendas no Mês</p>
                  <p className="text-3xl font-bold text-gray-900">47</p>
                </div>
              </div>
    
              {/* Card 3: Valor Ganho */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01v-2.01m-3.34-1.12A9 9 0 003 12a9 9 0 009 9 9 9 0 009-9c0-2.355-.91-4.52-2.4-6.16m-13.2 0A9 9 0 0112 3a9 9 0 019 9" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Receita do Mês</p>
                  <p className="text-3xl font-bold text-gray-900">R$ 3.850,75</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }