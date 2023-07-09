import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonList from './pages/PokemonListData/PokemonList';
import PokemonData from './pages/PokemonData/Pokemon';
import Search from './components/Search';
import './scss/index.css';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [newUrl, setNewUrl] = useState('')
  const [pokedex, setPokedex] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState(20)
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');

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
        setNewUrl(`https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`)
        setPrev(response.data.previous)
        setNext(response.data.next)
        console.log();
        console.log();
      }
       catch (error) {
        console.log('Error:', error.message);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [url, page]);

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
    const fetchNewData = async () => {
      try {
        if (pokemon && pokemon.species ) {
          const response = await axios.get(pokemon.species.url);
          const speciesData = response.data;
          setSpecies(speciesData);
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    };
  
    fetchNewData();
  }, [pokemon]);
  
  const handleSearch = (name) => {
    setPokemonData(name)
  };

  const formatHome = () => {
    setPokemon(null);
  };

  const handleNewPage = (pageNum) => {
    setPage(pageNum);
    setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${pageNum * results}&limit=${results}`);
  }

  const handlePageResults= (result) => {
    setResults(result);
    setPage(0)
    setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${result}`);
  }

  return (
    <div className="App">
      <div className='diagonal-background'></div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Search handleSearch={handleSearch} handlePageResults={handlePageResults} pokedex={pokedex} results={results} />
          {pokemon ? (
            <PokemonData pokemon={pokemon} species={species} setPokemonData={setPokemonData} formatHome={formatHome} />
          ) : (
            <div>
              <PokemonList pokedex={pokedex} setPokemonData={setPokemonData} page={page} handleNewPage={handleNewPage} />
            </div>
          )}
        </>
      )}
      
    </div>
  );
}

export default App;
