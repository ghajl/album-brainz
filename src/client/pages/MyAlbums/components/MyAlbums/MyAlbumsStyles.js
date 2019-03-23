export default {
  root: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'column'
  },
  albumsList: {
    maxWidth: 700
  }
};
