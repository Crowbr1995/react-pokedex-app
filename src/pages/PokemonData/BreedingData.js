import React from 'react';

import { capitalizeLetter } from '../../utils';

export default function BreedingData({ species }) {
  if (!species) {
    return null;
  }

  return (
    <div>
      <h2 className='title'>Breeding Data</h2>
      <div className='breeding-data-container type-border'>
      <div>
        <h3>Egg Groups:</h3>   
          {species.egg_groups && species.egg_groups.map((group, index) => (
            <React.Fragment key={group.name}>
              <p>{capitalizeLetter(group.name)}</p>
              {index !== species.egg_groups.length - 1 && <span>,</span>}
            </React.Fragment>
          ))}
      </div>
        <div>
          <h3>Egg Cycles:</h3>
          <p>{species.hatch_counter}</p>
        </div>
      </div>
    </div>
  );
}
