import React from 'react';
import { withStyles, MuiThemeProvider } from '@6thquake/react-material/styles';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Progress from '@6thquake/react-material/Progress';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  height: {
    height: 1.6,
  },
  barColor: {
    backgroundColor: theme.palette.progress.dark,
    // backgroundColor: "#00BFA5"
  },
  color: {
    backgroundColor: theme.palette.common.white,
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
        classes={{
          root: classes.height,
          colorPrimary: classes.color,
          barColorPrimary: classes.barColor,
        }}
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
    load: state.pageLoaded,
  })),
  withStyles(styles),
)(PageProgress);
