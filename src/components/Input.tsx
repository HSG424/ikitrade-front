import React, { useState } from "react";

async function sendRequest(searchInput: string) {
  const response = await fetch(
    // `https://champagne-basket-clam-garb.cyclic.app/api/search-fid?search=${searchInput}`
    `https://champagne-basket-clam-garb.cyclic.app/api/search-fin?search=${searchInput}`
  );
  const results = await response.json();
  console.log("sendRequest results: ", results);
}

const Button = () => {
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

export default Button;
