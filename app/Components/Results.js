import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from 'react-icons/fa';

import Tooltip from './Tooltip';
import Card from './Card';
import Loading from './Loading';
import { battle } from '../utils/api';

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px'
  }
};

class ProfileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveringLocation: false,
      hoveringCompany: false
    };
  }

  render() {
    const { profile } = this.props;
    return (
      <ul className="card-list">
        <li>
          <FaUser color="rgb(239, 115, 115)" size={22} />
          {profile.name}
        </li>
        {profile.location && (
          <Tooltip text="User's Location">
            <li>
              <FaCompass color="rgb(144, 115, 255)" size={22} />
              {profile.location}
            </li>
          </Tooltip>
        )}
        {profile.company && (
          <Tooltip text="User's Company">
            <li>
              <FaBriefcase color="#795548" size={22} />
              {profile.company}
            </li>
          </Tooltip>
        )}
        <li>
          <FaUsers color="rgb(129, 195, 245)" size={22} />
          {profile.followers.toLocaleString()} followers
        </li>
        <li>
          <FaUserFriends color="rgb(64, 183, 95)" size={22} />
          {profile.following.toLocaleString()} following
        </li>
      </ul>
    );
  }
}

function battleReducer(state, action) {
  if (action.type === 'success') {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.message,
      loading: false
    };
  } else {
    throw new Error(`That action type isn't supported`);
  }
}

export default function Results({ location }) {
  const { playerOne, playerTwo } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true
  });

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then(players =>
        dispatch({ type: 'success', winner: players[0], loser: players[1] })
      )
      .catch(({ message }) => dispatch({ type: 'error', message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading === true) {
    return <Loading text="Battling" />;
  }
  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </React.Fragment>
  );
}
