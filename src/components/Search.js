import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = ({inputText, clearResults, handleTextChange}) => {
  return (
    <div className="search__container">
      <div className="field has-addons">
        <p className="control">
          <a className="button is-dark">Search</a>
        </p>
        <p className="control" >
          <input 
          className="input" 
          placeholder="county" 
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
