import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Battle from './Components/Battle';
import Popular from './Components/Popular';
import Results from './Components/Results';
import Nav from './Components/Nav';
import './index.css';

import { ThemeProvider } from './contexts/theme';

function App() {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () =>
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />
            <Switch>
              <Route exact path="/" component={Popular} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Results} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
