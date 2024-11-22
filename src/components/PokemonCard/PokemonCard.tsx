import { useMemo } from 'react';
import { Pokemon } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import { getPokemonBgColor } from '../../utils/colors';

interface StylesProps {
  background: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const background = useMemo(() => getPokemonBgColor(pokemon), [pokemon]);

  const classes = useStyles({
    background,
  });

  return (
    <div className={classes.card}>
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
      maxWidth: '100%',
      height: '336px',
      padding: '12px',
      gap: '8px',
      border: '10px solid white',
      borderRadius: '4px',
      background: props.background,
      '& h2, & p': {
        margin: '0',
      },
      transition: 'all 200ms ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        animation: '$borderGlow 1s infinite',
      },
    }),
    image: {
      objectFit: 'contain',
      maxWidth: '150px',
      maxHeight: '150px',
      padding: '8px',
      backgroundColor: 'white',
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
  { name: 'PokemonCard' }
);
