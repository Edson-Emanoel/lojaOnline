// src/components/LayoutWrapper.tsx
'use client'; // <-- ESSA LINHA É A MAIS IMPORTANTE!

import { usePathname } from 'next/navigation';
import Header from './Header'; // Verifique se o caminho para seu Header está correto

type LayoutWrapperProps = {
  children: React.ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const rotaAcessada = usePathname();

  // A sua lógica condicional que estava no layout vem para cá
  const isAuthPage = rotaAcessada === '/login' || rotaAcessada === '/signup';

  return (
    <>
      {!isAuthPage && <Header />}
      <main>{children}</main>
    </>
  );
}