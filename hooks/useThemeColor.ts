import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type Theme = 'light' | 'dark';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Obter o tema atual, com fallback para 'light' caso não seja detectado
  const theme: Theme = useColorScheme() ?? 'light';

  // Tentar pegar a cor diretamente das props
  const colorFromProps = props[theme];

  // Se a cor foi definida nas props, retornar essa cor
  if (colorFromProps) {
    return colorFromProps;
  }

  // Caso contrário, retornar a cor padrão do tema (light ou dark)
  return Colors[theme][colorName];
}
