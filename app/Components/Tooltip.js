import React from 'react';
import PropTypes from 'prop-types';
import withHover from './withHover';

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

function Tooltip({ text, children, hovering }) {
  // with our HOC, we can pass hovering to any component
  return (
    <div style={styles.container}>
      {hovering && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired
};

// HOC is a component
// Takes in another component as an arg
// Returns a new component
// Returned component renders original component passed into it.
export default withHover(Tooltip, 'hovering');
