import React, { useState } from "react";
import { API_DOMAIN, API_SEARCH } from "../config";

async function sendRequest(searchInput: string) {
  const queryParams = `?search=${searchInput}`;
  const response = await fetch(`${API_DOMAIN}${API_SEARCH}${queryParams}`);
  const results = await response.json();
  console.log("sendRequest results: ", results);
}

const Input = () => {
  const [searchInput, setSearchInput] = useState("");

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  if (searchInput.length > 2 && searchInput.length < 5) {
    sendRequest(searchInput);
  }

  return (
    <div>
      <form>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchInput}
          onChange={searchChangeHandler}
        />
      </form>
    </div>
  );
};

export default Input;
