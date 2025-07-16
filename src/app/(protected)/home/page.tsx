import Image from 'next/image';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Definindo um tipo para o nosso produto
type Product = {
  id: number;
  name: string | null;
  value: number | null;
  description: string | null;
  img_url: string | null;
};

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return <p className="text-center text-red-500 mt-10">Não foi possível carregar os produtos.</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nossa Vitrine de Produtos</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <div 
              key={product.id} 
              // 1. O card principal agora é um contêiner flexível vertical
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-full h-56">
                <Image 
                  src={product.img_url || 'https://via.placeholder.com/300/CCCCCC/FFFFFF/?text=Sem+Imagem'} 
                  alt={product.name || 'Produto sem nome'} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>

              {/* 2. A área de conteúdo cresce para preencher o espaço e alinha os grupos */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                
                {/* GRUPO 1: Nome e Descrição */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 truncate">{product.name}</h2>
                  <p className="mt-2 text-sm text-gray-600 min-h-[40px]">
                    {product.description || 'Sem descrição disponível.'}
                  </p>
                </div>
                
                {/* GRUPO 2: Preço e Botão */}
                <div className="mt-4">
                  <p className="text-2xl font-light text-blue-600">
                    {product.value 
                      ? product.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                      : 'Preço a consultar'}
                  </p>
                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors">
                    Ver Detalhes
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}