import { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Link, useLocation } from 'react-router-dom';
import { PokemonCard } from '../PokemonCard';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

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
      <ul className={classes.list}>
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link
              to={`/pokemon/${pokemon.id}`}
              state={{ background: location }}
              className={classes.link}
            >
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
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
      marginBottom: '40px',
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
      listStyle: 'none',
      margin: '0',
      padding: '0',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '24px',
    },
    link: {
      textDecoration: 'none',
    },
  },
  { name: 'PokemonList' }
);
