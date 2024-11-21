module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Adicione plugins aqui se necessário
      ['module-resolver', {
        alias: {
          '@': './src', // Cria um alias para facilitar importações
        },
      }],
      'react-native-reanimated/plugin' // Necessário para o React Native Reanimated
    ],
  };
};
