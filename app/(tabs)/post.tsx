import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { getData, storeData } from '../storage';
import { useRouter } from 'expo-router';
import '../App.css'; 
import { AuthContext } from '../authcontext';

interface Post {
  title: string;
  content: string;
  authorId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function NewPost() {
  const router = useRouter();
  const { user } = useContext(AuthContext); // User context to get user details

  // State for post title and content
  const [postContent, setPostContent] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');

  // Effect for checking token and user status
  useEffect(() => {
    const token = getData();
    if (!token) {
      router.replace('/login'); // Redirect to login if no token
    }
  }, [router]);

  // Handle post submission
  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postTitle || !postContent) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/post/create", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          authorId: user?.id,
        }),
      });

      if (response.ok) {
        alert('Postagem criada com sucesso!');
        setPostTitle(''); // Clear title
        setPostContent(''); // Clear content
      } else {
        console.error('Erro ao criar a postagem', response);
        alert('Erro ao criar a postagem');
      }
    } catch (error) {
      console.error('Erro ao enviar a postagem:', error);
      alert('Erro ao enviar a postagem');
    }
  };

  return (
    <div className="nova-postagem-container">
      <div className="user-info">
        <div className="username">@{user?.email.split('@')[0]}</div>
      </div>

      <form className="post-form-container" onSubmit={handlePostSubmit}>
        <div className="form-title">Criar Nova Postagem</div>

        <div className="post-input-container">
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Título da postagem"
            className="post-title-input"
            required
          />

          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Escreva sua postagem aqui..."
            className="post-input"
            required
          />
        </div>

        <button type="submit" className="publish-button">
          Publicar
        </button>
      </form>
    </div>
  );
}
