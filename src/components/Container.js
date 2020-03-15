import React from "react";

const Container = props => {
  return (
    <div className="container__outer">
      <div className="container__inner">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
