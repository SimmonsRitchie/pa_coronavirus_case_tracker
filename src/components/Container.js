import React from "react";

const Container = props => {
  /* Outermost container for app */
  return (
    <div className="container__outer">
      <div className="container__inner">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
