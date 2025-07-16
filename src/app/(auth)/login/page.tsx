'use client';

import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// CORREÇÃO 2: O caminho para o cliente Supabase foi ajustado
import { supabase } from '@/lib/supabase/client';

// Esquema Zod permanece o mesmo
const LoginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(1, { message: 'A senha não pode estar em branco.' }),
});

type LoginFormErrors = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<LoginFormErrors>>({});
  const [formError, setFormError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setFormError('');

    const formData = { email, password };
    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<LoginFormErrors> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      setFormError('Email ou senha inválidos.');
      return;
    }

    // Você mencionou redirecionar para /home, então ajustei aqui
    router.push('/home'); 
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Lado da Imagem */}
      <div className="relative hidden flex-1 md:block">
        <Image 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" 
            alt="Background" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
        />
      </div>
      
      {/* Lado do Formulário */}
      {/* CORREÇÃO 1: Adicionado z-10 e bg-white para garantir que o formulário fique por cima */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 z-10 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Bem-vindo de volta!</h1>
            <p className="mt-2 text-gray-500">Faça login para continuar</p>
          </div>
          
          {formError && <p className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{formError}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-left text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm text-[#424242] ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-left text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm text-[#424242] ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Entrar
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;