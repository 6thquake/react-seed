import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withStyles, MuiThemeProvider } from '@6thquake/react-material/styles';

import NavBar from '$components/NavBar';
import Container from '$components/Container';
import Message from '$components/Message';
import BrowserTitle from '$components/BrowserTitle';
import LocaleProvider from '$components/LocaleProvider';
import compose from 'recompose/compose';
import PageProgress from '$components/PageProgress';
import { LoadingPanel } from '@6thquake/react-material/Panel';
import { connect } from 'react-redux';

import theme from '$themes';
import store from '$redux';

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
  state = {
    load: false,
  };

  render() {
    const { classes } = this.props;
    const { load } = this.state;
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <LocaleProvider>
            <div className={classes.progressBox}>
              <PageProgress />
            </div>
            <HashRouter>
              <div className={classes.root}>
                <NavBar />
                <Container />
              </div>
            </HashRouter>
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
// export default compose(connect(state => ({
//     load: state.open
// })), withStyles(styles))(App);
