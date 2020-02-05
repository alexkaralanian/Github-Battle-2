import React from 'react';
// NOT IN USE.
// THIS IS OUR RENDER PROP METHOD.

export default class Hover extends React.Component {
  state = {
    hovering: false
  };

  mouseOver = () => {
    this.setState({
      hovering: true
    });
  };

  mouseOut = () => {
    this.setState({
      hovering: false
    });
  };

  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {/* Render Props 
        Children is now a function
        We pass hovering in as a function to the argument and call it 
        Calling it render ths UI
        */}
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
