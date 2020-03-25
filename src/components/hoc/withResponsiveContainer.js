import React from "react";
import { throttle } from "throttle-debounce";

function withResponsiveContainer(
  Component, 
  {margin={
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0 
  }}={}, throttleDelay=300) {
  /*
   * A HOC that wraps a component in a div and provides height and width 
   *
   * optional params:
   * @margin: Object in form {top: int, right: int, bottom: int, left: int}
   */
  return class ResponsiveContainer extends Component {
    constructor(props) {
      super(props);
      this.containerRef = React.createRef();
      this.state = {
        width: 0,
        height: 0
      };
      //! Important: must bind otherwise ref will be inacessible on event listener calls
      this.resize = this.resize.bind(this);
      // * We use throttle to improve performance
      this.throttledHandleWindowResize = throttle(throttleDelay, this.resize);
    }

    componentDidMount() {
      // initial sizing
      this.resize();
      // resize if window changes
      window.addEventListener("resize", this.throttledHandleWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.throttledHandleWindowResize);
    }

    resize() {
      const containerEl = this.containerRef.current;
      const width = containerEl.getBoundingClientRect().width;
      const height = containerEl.getBoundingClientRect().height;
      this.setState({
        width,
        height
      });
  }

  style = {
    width: "100%",
    height: "100%",
  }


    render() {
      const { width, height } = this.state;
      return (
        <div ref={this.containerRef} style={this.style} >
            <Component
              height={height - (margin.top + margin.bottom)}
              width={width - (margin.left + margin.right)}
              {...this.props}
            />
        </div>
      );
    }
  };
}

export default withResponsiveContainer;
