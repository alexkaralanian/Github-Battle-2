import React from 'react';
// NOT IN USE
// THIS IS OUR HOC COMPONENT FOR HOVER

// function that takes in a component and returns another component
export default function withHover(Component, propName = 'hovering') {
  // returning another component
  return class WitHover extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hovering: false
      };

      this.mouseOver = this.mouseOver.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
    }
    mouseOver() {
      this.setState({
        hovering: true
      });
    }

    mouseOut() {
      this.setState({
        hovering: false
      });
    }

    render() {
      // To prevent naming collisions, we allow end-user to specify what the 'hovering'  propName will be.
      // we then merge that into the remaining props object being passed from ToolTip down to withHover
      const props = {
        [propName]: this.state.hovering,
        ...props
      };

      return (
        // We pass entire updated props object down to withHowver
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
}
