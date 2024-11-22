import { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonListItem } from '../PokemonListItem';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [pokemons, searchTerm]
  );

  return (
    <div className={classes.root}>
      <input
        type="text"
        className={classes.search}
        placeholder="Search Pokémon by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      <div className={classes.list}>
        {filteredPokemons.map((pokemon) => (
          <PokemonListItem key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
    },
    search: {
      width: '240px',
      boxSizing: 'border-box',
      fontSize: '16px',
      marginBottom: '16px',
      padding: '12px',
      color: 'black',
      border: '2px solid gray',
      borderRadius: '4px',
      transition: 'border-color 200ms ease',
      '&:focus': {
        borderColor: '#FFD23F',
        outline: 'none',
      },
    },
    list: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '24px',
    },
  },
  { name: 'PokemonList' }
);
