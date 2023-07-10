import { useState, useEffect } from "react";

export default function Search({ handleSearch, handlePageResults, results }) {
  const [name, setName] = useState('');

  const handleInput = (e) => {
    e.preventDefault();
    handleSearch(name);
  };

  const handlePerPageChange = (e) => {
    const perPage = parseInt(e.target.value);
    handlePageResults(perPage);
  };

  return (
    <div className="Search">
      <h2>PokéFinder</h2>
      <form className="search-form" onSubmit={handleInput}>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button className="submit-btn" type="submit"><img src="assets/search.png" /></button>
      </form>
      <div className="result-container">
        <label>Results per page </label>
        <select className="dropdown-container" onChange={handlePerPageChange}>
          <option className="dropdown-default">{results}</option>
          <option className="dropdown-item" value="10">10</option>
          <option className="dropdown-item" value="20">20</option>
          <option className="dropdown-item" value="50">50</option>
          <option className="dropdown-item" value="100">100</option>
          <option className="dropdown-item" value="250">250</option>
          <option className="dropdown-item" value="1010">All</option>
        </select>
      </div>
    </div>
  );
}

