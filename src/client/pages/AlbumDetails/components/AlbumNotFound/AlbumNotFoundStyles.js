export default {
  root: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
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
  textField: {
    width: 300,
    maxWidth: '100%',
    display: 'block',
    height: 'calc(2.25rem + 2px)',
    padding: '.375rem .75rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#495057',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    borderRadius: '.25rem'
  },
  label: {
    marginBottom: '.5rem'
  }
};

