import React from 'react';
import ReactDOM from 'react-dom';
import Battle from './Components/Battle';
import Popular from './Components/Popular';
import Nav from './Components/Nav';
import './index.css';

import { ThemeProvider } from './contexts/theme';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }));
      }
    };
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className="container">
            <Nav />
            {/* <Popular /> */}
            <Battle />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
