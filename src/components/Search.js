import React from "react";

const Search = () => {
  return (
    <div className="search__container">
      <div className="field has-addons">
        <p className="control">
          <a className="button is-dark">Search county:</a>
        </p>
        <p className="control">
          <input class="input" type="text" placeholder="Your email" />
        </p>
      </div>
    </div>
  );
};

export default Search;
