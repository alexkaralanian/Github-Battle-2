import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api.js';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa';

import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LanguagesNav({ updateLanguage, selectedLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            onClick={() => updateLanguage(language)}
            className="btn-clear nav-link"
            style={language === selectedLanguage ? { color: 'red' } : null}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, i) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${i + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <Tooltip text="Github username">
                  <li>
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </li>
                </Tooltip>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

function popularReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message
    };
  } else {
    throw new Error("This action type isn't supported");
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('All');
  const [state, dispatch] = React.useReducer(popularReducer, { error: null });

  // useRef lets you add state to a component that will not trigger a rerender and persists across renders.
  const fetchedLanguages = React.useRef([]);

  // want to keep track of all languages fetched without reinvoking effect, to cache.
  React.useEffect(() => {
    if (!fetchedLanguages.current.includes(selectedLanguage)) {
      fetchedLanguages.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage).then(repos =>
        dispatch({ type: 'success', selectedLanguage, repos }).catch(err =>
          dispatch({ type: 'error', error })
        )
      );
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <React.Fragment>
      <LanguagesNav
        updateLanguage={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
      />
      {isLoading() && <Loading text="Fetching Repos" />}
      {state.error && <p className="center-text error">{error}</p>}
      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
}
