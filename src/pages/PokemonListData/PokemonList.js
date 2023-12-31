import React from 'react';

import { capitalizeLetter, formatIdxNum } from '../../utils';

import Type from '../../components/Type';
import Pagination from '../../components/Pagination';

export default function Pokedex({ pokedex, setPokemonData, page, handleNewPage, handlePageResults, results }) {

  return (
    <div className='PokemonList'>
      <Pagination pokedex={pokedex} page={page} handleNewPage={handleNewPage} handlePageResults={handlePageResults} results={results} />
      <div className='pokedex'>
      {pokedex.map(p => {
        if (p.id < 10000) {
          return (
            <div className={`pokedex-item ${p.types[0].type.name}`} key={p.name} onClick={() => setPokemonData(p.name)}>
              <div className='pokedex-entry'>
                <p className='entry-number'>#{formatIdxNum(p.id)}</p>
                <h3 className='entry-name'>{capitalizeLetter(p.name)}</h3>
              </div>
              <img src={p.sprites.front_default} alt={p.name} />
              <div className='type-container'>
                {p.types.map(types => (
                  <Type type={types.type.name} key={types.type.name} />
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
    </div>
  );
}
