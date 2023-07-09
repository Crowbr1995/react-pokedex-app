import { useState, useEffect } from 'react';
import axios from 'axios';

import { capitalizeLetter, formatIdxNum } from '../../utils';

import Type from '../../components/Type';

export default function Pokedex({ pokedex, setPokemonData, page, handleNewPage }) {
  const [pageIndx, setPageIndx] = useState([]);
  const totalPages = 1000 / pokedex.length;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    const indxNum = page + 9;
    const indxArr = Array.from({ length: indxNum }, (_, index) => index + 1);

    handlePageIndx(pageNumbers, indxArr);
  }, [page]);

  const handlePageIndx = (pageArr, listArr) => {
    const indxArr = [];
  
    for (let i = 0; i <= pageArr.length; i++) {
      for (let y = 0; y <= listArr.length; y++) {
        if (i === y && i >= page) {
          indxArr.push(y);
        }
      }
    }

    for (let i = 0; i < 11; i++) {
      if (indxArr.length < 10) {
        indxArr.unshift(page--)
      } else {
        break;
      }
    }
  
    setPageIndx(indxArr);
    return indxArr;
  };
  
  const handlePageNum = (num) => {
    if (num == page) {
      return 'current';
    } else if (num < 0) {
      return 'none';
    }
  }

  return (
    <div className='PokemonList'>
      <div>
        <button className={`page-btn ${page < 10 ? 'inactive' : null}`} onClick={() => handleNewPage(page - 10)}>{'<<'}</button>
        <button className={`page-btn ${page === 0 ? 'inactive' : null}`} onClick={() => handleNewPage(page - 1)}>Previous</button>
        {pageIndx.map((num) => (
          <div className={`number ${handlePageNum(num)}`} key={num}>{num + 1}</div>
        ))}
        <button className={`page-btn ${page === totalPages ? 'inactive' : null}`} onClick={() => handleNewPage(page + 1)}>Next</button>
        <button className={`page-btn ${page > totalPages - 11 ? 'inactive' : null}`} onClick={() => handleNewPage(page + 10)}>{'>>'}</button>
      </div>

      <div className='pokedex'>
      {pokedex.map(p => {
        if (p.id < 10000) {
          return (
            <div className={`pokedex-item ${p.types[0].type.name}`} key={p.name} onClick={() => setPokemonData(p.name)}>
              <p>{formatIdxNum(p.id)}</p>
              <h3>{capitalizeLetter(p.name)}</h3>
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
