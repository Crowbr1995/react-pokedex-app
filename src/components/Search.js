import { useState, useEffect } from "react";

export default function Search({ handleSearch, handlePageResults }) {
  const [name, setName] = useState('');

  const handleInput = (e) => {
    e.preventDefault();
    handleSearch(name);
  };

  return (
    <div className="Search">
      <h2 onClick={() => {handlePageResults(20)}}>PokéFinder</h2>
      <form className="search-form" onSubmit={handleInput}>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button className="submit-btn" type="submit"><img src="assets/search.png" /></button>
      </form>
    </div>
  );
}

