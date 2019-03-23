import React from 'react';
import withStyles from 'react-jss';

const styles = {
  content: {
    flex: '1 0 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const NotFound = ({ classes }) => (
  <div className={classes.content}>
    <h1>Page Not Found</h1>
  </div>
);

export default withStyles(styles)(NotFound);

