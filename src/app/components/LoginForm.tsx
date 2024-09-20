"use client"
import { signIn } from 'next-auth/react';

export default function LoginForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const data = { email, password };
    signIn('credentials', { ...data, callbackUrl: '/home' });
  }

  return (  
    <div className="flex items-center justify-center bg-gray-100 h-screen w-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoComplete="username"
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            autoComplete='current-password'
            name="password"
            type="password"
            placeholder="Senha"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
