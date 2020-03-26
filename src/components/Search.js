import React from "react";

const Search = () => {
  return (
    <div className="search__container">
      <div className="field has-addons">
        <p className="control">
          <a className="button is-dark">Search</a>
        </p>
        <p className="control">
          <input className="input" type="text" placeholder="county" />
        </p>
      </div>
    </div>
  );
};

export default Search;
