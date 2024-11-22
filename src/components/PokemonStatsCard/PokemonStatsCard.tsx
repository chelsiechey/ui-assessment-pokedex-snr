import { useMemo } from 'react';
import { Pokemon } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import { getPokemonBgColor } from '../../utils/colors';

interface StylesProps {
  background: string;
}

interface PokemonStatsCardProps {
  pokemon: Pokemon;
}

export const PokemonStatsCard = ({ pokemon }: PokemonStatsCardProps) => {
  const background = useMemo(() => getPokemonBgColor(pokemon), [pokemon]);

  const classes = useStyles({
    background,
  });

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <h2>{`${pokemon.name} #${pokemon.number}`}</h2>
        <figure className={classes.imageContainer}>
          <img
            className={classes.image}
            src={pokemon.image}
            alt={`${pokemon.name} image`}
          />
        </figure>
      </div>

      <dl className={classes.details}>
        <div className={classes.detail}>
          <dt>Weight:</dt>
          <dd>
            {pokemon.weight.minimum} - {pokemon.weight.maximum}
          </dd>
        </div>
        <div className={classes.detail}>
          <dt>Height:</dt>
          <dd>
            {pokemon.height.minimum} - {pokemon.height.maximum}
          </dd>
        </div>
        <div className={classes.detail}>
          <dt>Classification:</dt>
          <dd>{pokemon.classification}</dd>
        </div>
        <div className={classes.detail}>
          <dt>Types:</dt>
          <dd>{pokemon.types.join(', ')}</dd>
        </div>
        <div className={classes.detail}>
          <dt>Resistant:</dt>
          <dd>{pokemon.resistant.join(', ')}</dd>
        </div>
        <div className={classes.detail}>
          <dt>Weaknesses:</dt>
          <dd>{pokemon.weaknesses.join(', ')}</dd>
        </div>
        <div className={classes.detail}>
          <dt>Flee Rate:</dt>
          <dd>{pokemon.fleeRate}</dd>
        </div>
        <div className={classes.detail}>
          <dt>Max CP:</dt>
          <dd>{pokemon.maxCP}</dd>
        </div>
        <div className={classes.detail}>
          <dt>Max HP:</dt>
          <dd>{pokemon.maxHP}</dd>
        </div>
      </dl>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    card: (props: StylesProps) => ({
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      gap: '16px',
      border: '10px solid white',
      borderRadius: '4px',
      background: props.background,
      '& h2, & p': {
        margin: '0',
      },
    }),
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      gap: '12px',
    },
    imageContainer: {
      width: '40px',
      height: '40px',
      backgroundColor: 'white',
      margin: '0',
      padding: '8px',
      borderRadius: '4px',
    },
    image: {
      objectFit: 'contain',
      width: '100%',
      height: '100%',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '16px',
    },
    detail: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& dd': {
        textAlign: 'right',
      },
      '& dt': {
        fontWeight: '700',
      },
    },
  },
  { name: 'PokemonStatsCard' }
);
