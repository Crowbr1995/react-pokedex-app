import React from 'react';

import Move from './Move';

export default function MoveList({ pokemon }) {
  const organizedMoves = {
    levelUpMoves: [],
    machineMoves: [],
    tutorMoves: [],
    eggMoves: [],
  };

  pokemon.moves.forEach(move => {
    if (move.version_group_details.some(detail => detail.move_learn_method.name === 'level-up')) {
      organizedMoves.levelUpMoves.push(move);
    } else if (move.version_group_details.some(detail => detail.move_learn_method.name === 'machine')) {
      organizedMoves.machineMoves.push(move);
    } else if (move.version_group_details.some(detail => detail.move_learn_method.name === 'tutor')) {
      organizedMoves.tutorMoves.push(move);
    } else if (move.version_group_details.some(detail => detail.move_learn_method.name === 'egg')) {
      organizedMoves.eggMoves.push(move);
    }
  });
  
  organizedMoves.levelUpMoves.sort((a, b) => {
    const levelA = a.version_group_details[0].level_learned_at;
    const levelB = b.version_group_details[0].level_learned_at;
    return levelA - levelB;
  });

  return (
    <div>
      <h2 className='title'>Move List</h2>

      {organizedMoves.levelUpMoves.length > 0 && (
        <div className='moveset'>
          <h3 className='move-title'>Level Up Moves</h3>
          <div className='level-move-container type-border'>
            <h3>Lv.</h3>
            <h3>Move</h3>
            <h3>Type</h3>
            <h3>Category</h3>
            <h3>Power</h3>
            <h3>Accuracy</h3>
          </div>
            {organizedMoves.levelUpMoves.map(moves => (
              <Move key={moves.move.name} move={moves} learnLevel={moves.version_group_details[0].level_learned_at} level={true} />
            ))}
        </div>
      )}

      {organizedMoves.machineMoves.length > 0 && (
        <div className='moveset'>
          <h3 className='move-title'>Machine Moves</h3>
          <div className='move-container type-border'>
            <h3>Move</h3>
            <h3>Type</h3>
            <h3>Category</h3>
            <h3>Power</h3>
            <h3>Accuracy</h3>
          </div>
          <ul>
            {organizedMoves.machineMoves.map(moves => (
              <Move key={moves.move.name} move={moves}   />
            ))}
          </ul>
        </div>
      )}

      {organizedMoves.tutorMoves.length > 0 && (
        <div className='moveset'>
          <h3 className='move-title'>Tutor Moves</h3>
          <div className='move-container type-border'>
            <h3>Move</h3>
            <h3>Type</h3>
            <h3>Category</h3>
            <h3>Power</h3>
            <h3>Accuracy</h3>
          </div>
          <ul>
            {organizedMoves.tutorMoves.map(moves => (
              <Move key={moves.move.name} move={moves}  />
            ))}
          </ul>
        </div>
      )}

      {organizedMoves.eggMoves.length > 0 && (
        <div className='moveset'>
          <h3 className='move-title'>Egg Moves</h3>
          <div className='move-container type-border'>
            <h3>Move</h3>
            <h3>Type</h3>
            <h3>Category</h3>
            <h3>Power</h3>
            <h3>Accuracy</h3>
          </div>
          <ul>
            {organizedMoves.eggMoves.map(moves => (
              <Move key={moves.move.name} move={moves}  />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// tmNumber={move.version_group_details[0].machine.tm}