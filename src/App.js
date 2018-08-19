import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withStyles, MuiThemeProvider } from '@6thquake/react-material/styles';

import NavBar from '$components/NavBar';
import Container from '$components/Container';
import Message from '$components/Message';
import BrowserTitle from '$components/BrowserTitle';
import LocaleProvider from '$components/LocaleProvider';
import compose from 'recompose/compose';
import RouterProgress from '$components/RouterProgress';
import { LoadingPanel } from '@6thquake/react-material/Panel';
import { connect } from 'react-redux';

import theme from '$themes';
import store from '$redux';

import { history } from '$components/Router';
import { ConnectedRouter, push } from 'react-router-redux';

const styles = theme => ({
  root: {
    display: 'flex',
  },

  progressBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.tooltip,
    width: '100%',
  },
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <LocaleProvider>
            <div className={classes.progressBox}>
              <RouterProgress />
            </div>

            {/* ConnectedRouter will use the store from Provider automatically */}

            {/*<BrowserRouter>*/}
            <ConnectedRouter history={history}>
              <div className={classes.root}>
                <NavBar />
                <Container />
              </div>
            </ConnectedRouter>
            {/*</BrowserRouter>*/}

            {/* <Panel/>  */}
            <Message />
            <BrowserTitle />
          </LocaleProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
