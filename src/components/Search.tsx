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
  hideSearchResults: boolean;
  onSelectCompany: (symbol: string, desc: string) => void;
}

const Search = ({ onSelectCompany, hideSearchResults }: SearchProps) => {
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
    onSelectCompany(symbol, desc);
  };

  let search = <div></div>;
  if (searchLoading) {
    search = <Loading className="search-loading" />;
  } else if (searchResults.length > 0) {
    search = (
      <ul>
        {searchResults.map((results) => (
          <li
            className="search-result"
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
    search = <p>No Results</p>;
  }

  return (
    <div className="search-cont">
      <form>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          className="search-input"
          placeholder="Search ticker, company or profile"
          value={searchInput}
          onChange={searchChangeHandler}
          maxLength={10}
        />
      </form>
      <div
        className={`search-results-cont ${hideSearchResults ? "hidden" : ""}`}
      >
        {search}
      </div>
    </div>
  );
};

export default Search;
