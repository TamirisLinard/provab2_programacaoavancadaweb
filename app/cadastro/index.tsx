import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import './App.css';
import { getData, storeData } from '../storage';

interface FormData {
  name: string;
  email: string;
  password: string;  // Corrigido de 'passworld' para 'password'
}

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '', // Corrigido aqui também
  });

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Enviando dados para o servidor
      const response = await fetch("http://localhost:3000/user/create", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirecionando para a página de login em caso de sucesso
        router.replace('/login');
      } else {
        // Caso a resposta não seja ok, você pode lidar com o erro
        console.log('Erro ao criar conta:', await response.json());
      }
    } catch (error) {
      // Exibindo erro em caso de falha na requisição
      console.error('Erro de conexão ou outro erro:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Bem-vindo</h1>
        <p>Crie sua conta para acessar</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Nome de usuário" 
          className="input" 
          required 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="E-mail" 
          className="input" 
          required 
        />
        <input 
          type="password" 
          name="password" // Corrigido para 'password'
          value={formData.password} // Corrigido para 'password'
          onChange={handleChange} 
          placeholder="Senha" 
          className="input" 
          required 
        />
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>

      <footer className="footer">
        <p>Já tem uma conta? <a href="/login">Entrar</a></p>
      </footer>
    </div>
  );
}
