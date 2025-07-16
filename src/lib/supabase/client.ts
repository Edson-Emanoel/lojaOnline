import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

// Usamos `createPagesBrowserClient` porque estamos em um ambiente de navegador
// dentro de componentes com a diretiva 'use client'.
export const supabase = createPagesBrowserClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});