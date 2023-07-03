import React from 'react'
import { capitalizeLetter, formatUnit, formatFeet, formatPounds } from '../../utils';

export default function PokedexData({ pokemon, species }) {
  const secondType = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;

  return (
    <div>
        <h2>Pokedex Data</h2>
        <div>
          <h3>Type</h3>
          <p>{capitalizeLetter(pokemon.types[0].type.name)}</p>
          {secondType && <p>{capitalizeLetter(secondType)}</p>}
        </div>
        <div>
          <h3>Classification</h3>
          <p>{species && species.genera.find((genus) => genus.language.name === 'en').genus}</p>
        </div>
        <div>
          <h3>Abilities</h3>
          {pokemon.abilities.map(ab => (!ab.is_hidden ? 
          <p key={ab.ability.name}>{capitalizeLetter(ab.ability.name)}</p> : 
          <p key={ab.ability.name}>{capitalizeLetter(ab.ability.name)}<span> (Hidden)</span></p>))}
        </div>
        <div>
          <h3>Height</h3>
          <p>{formatFeet(pokemon.height).feet}' {formatFeet(pokemon.height).inches}"</p>
          <p>{formatUnit(pokemon.height)}m</p>
        </div>
        <div>
          <h3>Weight</h3>
          <p>{formatPounds(pokemon.weight)}lbs</p>
          <p>{formatUnit(pokemon.weight)}kg</p>
        </div>
        <div>
            <h3>Local Number</h3>
            {species &&
                species.pokedex_numbers &&
                species.pokedex_numbers
                .filter((idx) => idx.pokedex.name !== "national")
                .map((idx) => 
                <div key={idx.pokedex.name}>
                    <p>{capitalizeLetter(idx.pokedex.name)}: </p>
                    <p>{idx.entry_number}</p>
                </div>)}
            </div>
      </div>
  )
}
