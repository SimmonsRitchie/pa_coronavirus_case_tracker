import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = ({inputText, clearResults, handleTextChange}) => {
  return (
    <div className="data-tests-search__container">
      <div className="field has-addons">

        <p className="control is-expanded" >
          <input 
          className="input is-fullwidth" 
          placeholder="Search by county" 
          type="text" 
          onChange={handleTextChange}
          value={inputText}
          />
        </p>
        <p className="control">
          <a className="button is-light" onClick={clearResults}>
            <FontAwesomeIcon icon={faTimes}  />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Search;

// <p className="control">
// <a className="button is-dark">Search</a>
// </p>