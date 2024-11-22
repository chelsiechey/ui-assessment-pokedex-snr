import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { createUseStyles } from 'react-jss';
import { PokemonStatsCard } from '../PokemonStatsCard/PokemonStatsCard';

export const PokemonModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading } = useGetPokemon(id);
  const classes = useStyles();

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={classes.modal}>
      <div className={classes.container}>
        <PokemonStatsCard pokemon={pokemon} />
      </div>
      <button className={classes.button} onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
    },
    container: {
      margin: '120px 24px',
    },
    button: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: 'black',
      cursor: 'pointer',
    },
  },
  { name: 'PokemonModal' }
);
