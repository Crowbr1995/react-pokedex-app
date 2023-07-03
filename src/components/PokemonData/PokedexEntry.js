import React from "react";

import { capitalizeLetter } from '../../utils';

export default function PokedexEntry({ species }) {
  const encounteredGames = [];
  let previousDescription = "";

  const removeSquareShapes = (text) => {
    return text.replace(//g, " ");
  };

  return (
    <div>
      <h2>Pokedex Entry</h2>
      {species &&
        species.flavor_text_entries.map((entry, index) => {
          if (
            entry.language.name === "en" &&
            !encounteredGames.includes(entry.version.name)
          ) {
            encounteredGames.push(entry.version.name);
            const cleanedDescription = removeSquareShapes(entry.flavor_text);
            if (cleanedDescription !== previousDescription) {
              previousDescription = cleanedDescription;
              return (
                <div key={index}>
                  <h3>{capitalizeLetter(entry.version.name)}</h3>
                  <p>{cleanedDescription}</p>
                </div>
              );
            }
          }
          return null;
        })}
    </div>
  );
}
