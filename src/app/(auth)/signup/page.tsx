'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
// 1. Importar nosso cliente Supabase
import { supabase } from '@/lib/supabase/client';

// O esquema Zod permanece o mesmo
const SignupSchema = z
  .object({
    name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    email: z.string().email({ message: 'Por favor, insira um email válido.' }),
    password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

type SignupFormErrors = z.infer<typeof SignupSchema>;

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Partial<SignupFormErrors>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 2. Transformar a função em async para usar await
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setFormError('');

    const result = SignupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<SignupFormErrors> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignupFormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    // 3. Lógica de cadastro com Supabase
    const { error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        // Você pode passar dados adicionais que serão salvos no usuário
        data: {
          full_name: result.data.name,
        },
      },
    });

    if (error) {
      // Exibe um erro genérico do formulário
      setFormError(error.message);
      return;
    }

    // Exibe mensagem de sucesso
    setSuccessMessage('Cadastro realizado! Por favor, verifique seu e-mail para confirmar sua conta.');
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
       <div className="relative hidden flex-1 md:block">
        <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt="Background" fill style={{ objectFit: 'cover' }} priority />
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* ... (o resto do JSX do cabeçalho do formulário permanece o mesmo) ... */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Crie sua conta</h1>
            <p className="mt-2 text-gray-500">É rápido e fácil. Vamos começar.</p>
          </div>
          
          {/* 4. Exibir mensagens de sucesso ou erro do formulário */}
          {successMessage && <p className="mb-4 text-center text-sm text-green-600 bg-green-100 p-3 rounded-md">{successMessage}</p>}
          {formError && <p className="mb-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{formError}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* ... (o resto do JSX dos inputs permanece o mesmo) ... */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-left text-gray-700">Nome Completo</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm text-[#424242] ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-left text-gray-700">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm text-[#424242] ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-left text-gray-700">Senha</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm text-[#424242] ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-left text-gray-700">Confirmar Senha</label>
              <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm text-[#424242] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-4">
              Criar Conta
            </button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;