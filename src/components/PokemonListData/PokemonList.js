import { useState } from 'react'

import { capitalizeLetter } from '../../utils';

export default function Pokedex({ pokedex, setPokemonData, goToPrev, goToNext, formatSeeMore }) {
  
  return (
    <div>
      <div>
        <button onClick={goToPrev}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>
        {pokedex.map(p => (
            <div key={p.name} onClick={() => setPokemonData(p.name)}>
              <h3>{capitalizeLetter(p.name)}</h3>
              <img src={p.sprites.front_default}/>
            </div>
        ))}
        <button onClick={formatSeeMore}>See More</button>
    </div>
  )
}
