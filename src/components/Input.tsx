import React, { useState, useEffect } from "react";
import {
  API_DOMAIN,
  API_SEARCH,
  DEFAULT_COMPANY,
  DEFAULT_COMPANY_DESC,
} from "../config";
import Loading from "./Loading";
import { Results } from "../types/types";

async function sendRequest(searchInput: string) {
  const queryParams = `?search=${searchInput}`;
  const response = await fetch(`${API_DOMAIN}${API_SEARCH}${queryParams}`);
  const results = await response.json();
  return JSON.parse(results).securities;
}

const Input = () => {
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

  let search = <div></div>;
  if (searchLoading) {
    search = <Loading />;
  } else if (searchResults.length > 0) {
    search = (
      <ul>
        {searchResults.map((results) => (
          <li key={results.symbol}>
            {results.desc} - {results.symbol}
          </li>
        ))}
      </ul>
    );
  } else if (searchResults.length === 0 && !noSearchYet) {
    search = <p>No results.</p>;
  }

  return (
    <div>
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
      <div className="selectedCompany">
        <p>{`Symbol: ${DEFAULT_COMPANY}`}</p>
        <p>{`${DEFAULT_COMPANY_DESC}`}</p>
      </div>
      {search}
    </div>
  );
};

export default Input;
