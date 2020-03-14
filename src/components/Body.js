import React from "react";

class Body extends React.Component {
  render() {
    return (
      <div className="body__container">
        {...this.props.children}
      </div>
    );
  }
}

export default Body;
