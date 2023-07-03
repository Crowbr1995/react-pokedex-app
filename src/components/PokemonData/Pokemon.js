import axios from 'axios';
import { useState, useEffect } from 'react';

import { capitalizeLetter } from '../../utils';

import PokedexData from './PokedexData';
import TrainingData from './TrainingData';
import StatData from './StatData';
import Evolution from './Evolution';
import PokedexEntry from './PokedexEntry';
import BreedingData from './BreedingData';
import MoveList from './MoveList';

export default function Pokemon({ pokemon, species, formatHome, setPokemonData }) {
  const [nextPokemonId, setNextPokemonId] = useState(null);
  const [prevPokemonId, setPrevPokemonId] = useState(null);
  const [nextPokemonImage, setNextPokemonImage] = useState(null);
  const [prevPokemonImage, setPrevPokemonImage] = useState(null);

  useEffect(() => {
    const fetchAdjacentPokemonData = async () => {
      try {
        if (pokemon) {
          const nextPokemonId = pokemon.id + 1;
          const prevPokemonId = pokemon.id - 1;

          const nextPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextPokemonId}`);
          const nextPokemonData = nextPokemonResponse.data;
          setNextPokemonId(nextPokemonData.id);
          setNextPokemonImage(nextPokemonData.sprites.front_default);

          const prevPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${prevPokemonId}`);
          const prevPokemonData = prevPokemonResponse.data;
          setPrevPokemonId(prevPokemonData.id);
          setPrevPokemonImage(prevPokemonData.sprites.front_default);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchAdjacentPokemonData();
  }, [pokemon]);

  const navigatePokemon = (pokemonId) => {
    if (pokemonId) {
      setPokemonData(pokemonId);
    }
  };

  return (
    <div>
      <button onClick={formatHome}>Back</button>
      <h2>{capitalizeLetter(pokemon.name)}</h2>
      <p>Pokedex: {pokemon.id}</p>
      <div>
        <div onClick={() => navigatePokemon(prevPokemonId)}>
          {prevPokemonImage && <img src={prevPokemonImage} alt="Previous Pokemon" />}
        </div>
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
        </div>
        <div onClick={() => navigatePokemon(nextPokemonId)}>
          {nextPokemonImage && <img src={nextPokemonImage} alt="Next Pokemon" />}
        </div>
      </div>
      <PokedexData pokemon={pokemon} species={species} />
      <TrainingData pokemon={pokemon} species={species} />
      <StatData pokemon={pokemon} />
      <BreedingData species={species} />
      <Evolution pokemonName={pokemon.name} species={species} setPokemonData={setPokemonData} />
      <PokedexEntry species={species} />
      <MoveList pokemon={pokemon} />
    </div>
  );
}
