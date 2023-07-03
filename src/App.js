import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pokedex from './components/PokemonListData/PokemonList';
import Pokemon from './components/PokemonData/Pokemon';
import './App.css';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [pokedex, setPokedex] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const pokemonResults = response.data.results;
        const pokemonDataPromises = pokemonResults.map((result) => axios.get(result.url));
        const pokemonDataResponses = await Promise.all(pokemonDataPromises);
        const pokemonData = pokemonDataResponses.map((res) => res.data);
        setPokedex(pokemonData);
        setLoading(false);
        setPrev(response.data.previous)
        setNext(response.data.next)
        console.log(pokemonData);
      }
       catch (error) {
        console.log('Error:', error.message);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [url]);

  const setPokemonData = async (pokemonName) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = response.data;
      setPokemon(pokemonData);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNewData = async (data) => {
      try {
        if (pokemon && pokemon.species ) {
          const response = await axios.get(pokemon.species.url);
          const speciesData = response.data;
          setSpecies(speciesData);
          console.log(speciesData);
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
  
    fetchNewData();
  }, [pokemon]);
  

  const formatHome = () => {
    setPokemon(null);
  };

  const goToPrev = () => {
    setUrl(prev)
  }

  const goToNext = () => {
      setUrl(next);
  }

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {pokemon ? (
            <Pokemon pokemon={pokemon} species={species} setPokemonData={setPokemonData} formatHome={formatHome} />
          ) : (
            <Pokedex pokedex={pokedex} setPokemonData={setPokemonData} goToPrev={goToPrev} goToNext={goToNext} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
