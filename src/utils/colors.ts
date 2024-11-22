import { BG_COLORS } from '../constants/colors';
import { Pokemon } from '../hooks/useGetPokemons';

export const getPokemonBgColor = (pokemon: Pokemon) => {
  const [firstColor, secondColor] = pokemon.types.map(
    (type) => BG_COLORS[type?.toLowerCase()]
  );
  if (firstColor && secondColor) {
    return `linear-gradient(45deg, ${firstColor} 50%, ${secondColor} 50%)`;
  } else if (firstColor) {
    return firstColor;
  } else if (secondColor) {
    return secondColor;
  }
  return 'black';
};
