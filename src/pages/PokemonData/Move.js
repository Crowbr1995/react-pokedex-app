import React, { useState, useEffect } from 'react';

import { capitalizeLetter } from '../../utils';

export default function Move({ move, learnLevel, level }) {
  const [moveData, setMoveData] = useState(null)

  const fetchMoveData = async () => {
    try {
      const response = await fetch(move.move.url);
      const responseData = await response.json();
      setMoveData(responseData);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchMoveData();
  }, [move]); 

  return (
    moveData && (
      <div className={`${level ? 'level-move' : 'move'} type-border`}>
        {level ? (<p>{learnLevel}</p>) : null}
        <p>{capitalizeLetter(moveData.name)}</p>
        <p>{capitalizeLetter(moveData.type.name)}</p>
        <p>{capitalizeLetter(moveData.damage_class.name)}</p>
        <p>{moveData.power ? moveData.power : "-"}</p>
        <p>{moveData.accuracy ? moveData.accuracy : "-"}</p>
      </div>
    )
  );  
}
