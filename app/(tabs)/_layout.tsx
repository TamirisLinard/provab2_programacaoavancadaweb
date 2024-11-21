import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../App.css';

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Obtém o esquema de cores atual, 'light' ou 'dark'

  // Define a cor ativa do ícone com base no esquema de cores
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,  // Cor do ícone ativo
        tabBarInactiveTintColor: '#8a8a8a',     // Cor do ícone inativo
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#ffffff', // Cor de fundo do tabBar
          borderTopWidth: 1,
          borderTopColor: '#dcdcdc',
          height: 70,  // Altura do tabBar
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins',  // Fonte para as labels dos ícones
          fontSize: 12,  // Tamanho da fonte
        },
        headerShown: false,  // Esconde o cabeçalho
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'newspaper' : 'newspaper-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Criar Post',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'pencil' : 'pencil-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
