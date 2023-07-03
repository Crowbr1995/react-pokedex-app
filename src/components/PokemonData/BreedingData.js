import React from 'react';

import { capitalizeLetter } from '../../utils';

export default function BreedingData({ species }) {
  if (!species) {
    return null;
  }

  return (
    <div>
      <h2>Breeding Data</h2>
      <h3>Egg Groups</h3>
      {species.egg_groups && species.egg_groups.map(group => <p key={group.name}>{capitalizeLetter(group.name)}</p>)}
      <h3>Egg Cycles</h3>
      <p>{species.hatch_counter}</p>
    </div>
  );
}
