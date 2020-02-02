import React from 'react';

export default class Hover extends React.Component {
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