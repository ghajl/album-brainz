import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import styles from './InfoStyles';

const Info = ({ id, artist, title, date, classes }) => {
  return (
    <div data-testid="info" className={classes.detailsBody}>
      <h1 data-testid="title">{title}</h1>
      <div data-testid="artists">
        <h4 className="mt-4">{`Artist:`}</h4>
        {artist.map(item => (
          <div key={item.id} data-testid="name">
            {item.name}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4>{`First Release Date: `}</h4>
        <div data-testid="date">{date}</div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Info);

Info.propTypes = {
  classes: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  artist: PropTypes.arrayOf(PropTypes.shape({})),
  date: PropTypes.string,
  title: PropTypes.string
};

Info.defaultProps = {
  classes: {},
  artist: [],
  date: '',
  title: ''
};
