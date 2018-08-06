import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withStyles, MuiThemeProvider } from '@6thquake/react-material/styles';
import { withRouter } from 'react-router-dom';

import SideBar from '$components/SideBar';
import Container from '$components/Container';
import Message from '$components/Message';
import BrowserTitle from '$components/BrowserTitle';
import LocaleProvider from '$components/LocaleProvider';
import compose from 'recompose/compose';
import { LoadingPanel } from '@6thquake/react-material/Panel';
import { connect } from 'react-redux';
import Event from '../../utils/Observable';
import Progress from '@6thquake/react-material/Progress';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class PageProgress extends React.Component {
  state = {
    load: false,
    finish: false,
  };

  render() {
    const { classes, load } = this.props;
    return (
      <Progress
        isPromise={true}
        isFinish={load}
        estimatedTime={10}
        // completed={30}
      />
    );
  }
}

// export default withStyles(styles, {withTheme: true})(App);
// export default compose(connect(state => ({
//     open: state.menuOpen
// })), withStyles(styles))(Panel);
export default compose(
  connect(state => ({
    load: state.pageLoad,
  })),
  withStyles(styles),
)(PageProgress);
