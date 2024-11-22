import { useMemo } from 'react';
import { Pokemon } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import { BG_COLORS } from '../../constants/colors';

interface StylesProps {
  background: string;
}

interface PokemonListProps {
  pokemon: Pokemon;
}

export const PokemonListItem = ({ pokemon }: PokemonListProps) => {
  const background = useMemo(() => {
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
    // Fallback if we do not have a custom color for the Pokemon type
    return 'black';
  }, [pokemon.types]);

  const classes = useStyles({
    background,
  });
  return (
    <div className={`${classes.card}`}>
      <h2>{`${pokemon.name} #${pokemon.number}`}</h2>
      <figure>
        <img
          className={classes.image}
          src={pokemon.image}
          alt={`${pokemon.name} image`}
        />
      </figure>
      <p>
        <span className={classes.bold}>Types: </span>
        {pokemon.types.join(', ')}
      </p>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    card: (props: StylesProps) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      width: '240px',
      height: '336px',
      padding: '12px',
      gap: '8px',
      border: '10px solid orange',
      borderRadius: '4px',
      background: props.background,
      '& h2, & p': {
        margin: '0',
      },
      transition: 'all 200ms ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        cursor: 'pointer',
        animation: '$borderGlow 1s infinite',
      },
    }),
    image: {
      objectFit: 'contain',
      maxWidth: '150px',
      maxHeight: '150px',
      border: '6px solid #FFD23F',
      borderRadius: '4px',
    },
    bold: {
      fontWeight: '700',
    },
    '@keyframes borderGlow': {
      '0%': {
        boxShadow: '0 0 4px #FFD23F, 0 0 8px #FFD23F',
      },
      '50%': {
        boxShadow: '0 0 6px #FFD23F, 0 0 12px #FFD23F',
      },
      '100%': {
        boxShadow: '0 0 4px #FFD23F, 0 0 8px #FFD23F',
      },
    },
  },
  { name: 'PokemonListItem' }
);
