import React from 'react'

import { capitalizeLetter } from '../../utils'

export default function TrainingData({ species, pokemon }) {
    if (!species) {
        return null; 
      }

  return (
    <div>
        <h2 className='title'>Training</h2>
        <div className='training-container type-border'>
            <div>
                <h3>Base Experience: </h3>
                <p>{pokemon.base_experience}</p>
            </div>
            <div>
                <h3>Catch Rate: </h3>
                <p>{species.capture_rate}</p>
            </div>
            <div>
                <h3>Base Friendship: </h3>
                <p>{species.base_happiness}</p>
            </div>
            <div>
                <h3>Growth Rate: </h3>
                <p>{capitalizeLetter(species.growth_rate.name)}</p>
            </div>
        </div>
    </div>
  )
}
