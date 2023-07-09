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
    <div>
      <form onSubmit={handleInput}>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <button className="submit-btn" type="submit">Search</button>
      </form>
      <div>
        <label>Results per page: </label>
        <select onChange={handlePerPageChange}>
          <option>{results}</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="1008">All</option>
        </select>
      </div>
    </div>
  );
}

