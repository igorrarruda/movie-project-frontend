import React from 'react';
import { CssBaseline, withStyles } from '@material-ui/core';

import Routes from './routes';
import backgroundImage from './assets/images/undraw_book_lover_mkck.svg';

const styles = (theme) => ({
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      background: '#dfdfdf',
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'bottom right',
      backgroundSize: '400px',
      backgroundRepeat: 'no-repeat',
      height: '100%',
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Routes />
    </React.Fragment>
  );
}

export default withStyles(styles)(App);
