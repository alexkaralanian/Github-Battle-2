import React from 'react';
import ReactDOM from 'react-dom';
import Battle from './Components/Battle';
import Popular from './Components/Popular';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <Popular /> */}
        <Battle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
