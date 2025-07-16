// src/app/dashboard/page.tsx

import Image from 'next/image';

// Placeholder product data (replace with your actual data fetching later)
const products = [
  {
    id: 1,
    name: 'Produto A Incrível',
    imageUrl: 'https://via.placeholder.com/300/F0F8FF/000000/?Text=Produto+A',
  },
  {
    id: 2,
    name: 'Super Produto B',
    imageUrl: 'https://via.placeholder.com/300/FAEBD7/000000/?Text=Produto+B',
  },
  {
    id: 3,
    name: 'Produto C Deluxe',
    imageUrl: 'https://via.placeholder.com/300/DCDCDC/000000/?Text=Produto+C',
  },
  {
    id: 4,
    name: 'Produto D Essencial',
    imageUrl: 'https://via.placeholder.com/300/8FBC8F/FFFFFF/?Text=Produto+D',
  },
  {
    id: 5,
    name: 'Produto E Premium',
    imageUrl: 'https://via.placeholder.com/300/4682B4/FFFFFF/?Text=Produto+E',
  },
  {
    id: 6,
    name: 'Produto F Fantástico',
    imageUrl: 'https://via.placeholder.com/300/FFDAB9/000000/?Text=Produto+F',
  },
  // Add more placeholder products as needed
];

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nossa Vitrine de Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700">{product.name}</h2>
                <p className="mt-2 text-sm text-gray-500">Descrição breve do produto aqui...</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;