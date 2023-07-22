import React from 'react'

import { capitalizeLetter, formatUnit, formatFeet, formatPounds } from '../../utils';

import Type from '../../components/Type';

export default function PokedexData({ pokemon, species, pokeType }) {
  const secondType = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;

  return (
    <div className='PokedexData'>
        <h2 className='title'>Pokedex Data</h2>
          <div className='poke-type-container type-border'>
            <h3>Type</h3>
            <div className='poke-type'>{pokemon.types.map(types => (
                  <Type type={types.type.name} key={types.type.name} />
                ))}
            </div>
          </div>
        <div className='pokedex-container pokedex-grid'>
          <div className='classification type-border'>
            <h3>Classification</h3>
            <p>{species && species.genera.find((genus) => genus.language.name === 'en').genus}</p>
          </div>
          <div className='abilities type-border'>
            <h3>Abilities</h3>
            {pokemon.abilities.map(ab => (!ab.is_hidden ? 
            <p key={ab.ability.name}>{capitalizeLetter(ab.ability.name)}</p> : 
            <p key={ab.ability.name}>{capitalizeLetter(ab.ability.name)}<span> (Hidden)</span></p>))}
          </div>
          <div className='height type-border'>
            <h3>Height</h3>
            <p>{formatFeet(pokemon.height).feet}' {formatFeet(pokemon.height).inches}"</p>
            <p>{formatUnit(pokemon.height)}m</p>
          </div>
          <div className='weight type-border'>
            <h3>Weight</h3>
            <p>{formatPounds(pokemon.weight)}lbs</p>
            <p>{formatUnit(pokemon.weight)}kg</p>
          </div>
          <div className='local type-border'>
              <h3>Local Number</h3>
              {species &&
                  species.pokedex_numbers &&
                  species.pokedex_numbers
                  .filter((idx) => idx.pokedex.name !== "national")
                  .map((idx) => 
                <div className={'local-area'} key={idx.pokedex.name}>
                      <p>{capitalizeLetter(idx.pokedex.name)}: </p>
                      <p>{idx.entry_number}</p>
                </div>)}
            </div>
          </div>
      </div>
  )
}
