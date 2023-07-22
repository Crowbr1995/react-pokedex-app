import axios from 'axios';
import { useState, useEffect } from 'react';

import { capitalizeLetter, formatIdxNum } from '../../utils';

import PokedexData from './PokedexData';
import TrainingData from './TrainingData';
import StatData from './StatData';
import Evolution from './Evolution';
import PokedexEntry from './PokedexEntry';
import BreedingData from './BreedingData';
import MoveList from './MoveList';

export default function Pokemon({ pokemon, species, formatHome, setPokemonData }) {
  const [nextPokemon, setNextPokemon] = useState(null);
  const [prevPokemon, setPrevPokemon] = useState(null);
  const [nextPokemonImage, setNextPokemonImage] = useState(null);
  const [prevPokemonImage, setPrevPokemonImage] = useState(null);
  const [pokeType, setPokeType] = useState('grass')

  useEffect(() => {
    const fetchAdjacentPokemonData = async () => {
      try {
        if (pokemon) {
          const nextPokemonId = pokemon.id + 1;
          const prevPokemonId = pokemon.id - 1;

          const nextPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nextPokemonId}`);
          const nextPokemonData = nextPokemonResponse.data;
          setNextPokemon(nextPokemonData);
          setNextPokemonImage(nextPokemonData.sprites.front_default);

          const prevPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${prevPokemonId}`);
          const prevPokemonData = prevPokemonResponse.data;
          setPrevPokemon(prevPokemonData);
          setPrevPokemonImage(prevPokemonData.sprites.front_default);
          setPokeType(pokemon.types[0].type.name)
          console.log(prevPokemonData);
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

    <div className={`Pokemon ${pokeType}`}>
        <button className="back-btn" onClick={formatHome}>X</button>
        <div className='data-main'>
          <div className='adjacent-container prev' onClick={() => navigatePokemon(prevPokemon.id)}>
            {prevPokemonImage &&
              <>
                <div className='adjacent-pokemon'>
                  <img src={prevPokemonImage} alt="Previous Pokemon" />
                  <p className='entry-number'>#{formatIdxNum(prevPokemon.id)}</p>
                  <h3 className='entry-name'>{capitalizeLetter(prevPokemon.name)}</h3>
                </div>
                <div className='arrow'>{'<'}</div>
              </> 
            }
          </div>
          <div className='main-container'>
            <h2 className='entry-name'>{capitalizeLetter(pokemon.name)}</h2>
            <p className='entry-number'>#{formatIdxNum(pokemon.id)}</p>
            <div className='main-img-container'>
              <img className='main-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img className='main-img' src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            </div>
          </div>
          <div className='adjacent-container next' onClick={() => navigatePokemon(nextPokemon.id)}>
            {nextPokemonImage && 
            <>
              <div className='arrow'>{'>'}</div>
              <div className='adjacent-pokemon'>
                <img src={nextPokemonImage} alt="Next Pokemon" />
                <p className='entry-number'>#{formatIdxNum(nextPokemon.id)}</p>
                <h3 className='entry-name'>{capitalizeLetter(nextPokemon.name)}</h3>
              </div>
            </> 
            }
          </div>
        </div>

      <div className="data-container">
        <PokedexData pokemon={pokemon} species={species} pokeType={pokeType} />
        <TrainingData pokemon={pokemon} species={species} />
        <StatData pokemon={pokemon} />
        <BreedingData species={species} />
        <Evolution pokemon={pokemon} setPokemonData={setPokemonData} />
        <PokedexEntry species={species} />
        <MoveList pokemon={pokemon} />
      </div>
    </div>
  );
}
