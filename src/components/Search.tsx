import React, { useState, useEffect } from "react";
import { API_DOMAIN, API_SEARCH } from "../config";
import Loading from "./Loading";
import { Results } from "../types/types";

async function sendRequest(searchInput: string) {
  const queryParams = `?search=${searchInput}`;
  const response = await fetch(`${API_DOMAIN}${API_SEARCH}${queryParams}`);
  const results = await response.json();
  return JSON.parse(results).securities;
}

interface SearchProps {
  onSelectCompany: (symbol: string, desc: string) => void;
}

const Search = ({ onSelectCompany }: SearchProps) => {
  const [searchLoading, setSearchLoading] = useState(false);

  const [noSearchYet, setNoSearchYet] = useState(true);

  const [searchInput, setSearchInput] = useState("");

  const [searchResults, setSearchResults] = useState<Results>([]);

  const sendRequestComp = async (searchInput: string) => {
    setSearchLoading(true);
    const response = await sendRequest(searchInput);
    if (!response) {
      setSearchResults([]);
    } else {
      setSearchResults(response);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (searchInput.length > 2) {
        setNoSearchYet(false);
        sendRequestComp(searchInput);
      }
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchInput]);

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const resultClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const symbol = event.currentTarget.dataset.symbol!;
    const desc = event.currentTarget.dataset.desc!;
    setNoSearchYet(true);
    setSearchResults([]);
    onSelectCompany(symbol, desc);
  };

  let search = <div></div>;
  if (searchLoading) {
    search = <Loading />;
  } else if (searchResults.length > 0) {
    search = (
      <ul>
        {searchResults.map((results) => (
          <li
            key={results.symbol}
            onClick={resultClickHandler}
            data-symbol={results.symbol}
            data-desc={results.desc}
          >
            {results.symbol} : {results.desc}
          </li>
        ))}
      </ul>
    );
  } else if (searchResults.length === 0 && !noSearchYet) {
    search = <p>No results.</p>;
  }

  return (
    <div className="search-results">
      <form>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search ticker, company or profile"
          value={searchInput}
          onChange={searchChangeHandler}
          size={25}
          maxLength={10}
        />
      </form>
      {search}
    </div>
  );
};

export default Search;
