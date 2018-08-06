import React, { Component } from 'react';
import AppBar from '@6thquake/react-material/AppBar';
import Toolbar from '@6thquake/react-material/Toolbar';
import Typography from '@6thquake/react-material/Typography';
import { withStyles } from '@6thquake/react-material/styles';
import IconButton from '@6thquake/react-material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import User from '$components/User';
import LanguageMenu from '$components/LanguageMenu';
import { withLocale } from '@6thquake/react-material/LocaleProvider';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { MENU_OPEN } from '$redux/types';
import { operateMenuOpen } from '$redux/actions/menuOpen';

const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    left: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      left: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(['width', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapse: {
    left: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      left: theme.spacing.unit * 9,
      width: `calc(100% - ${theme.spacing.unit * 9}px)`,
    },
    transition: theme.transitions.create(['width', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  flex: {
    flex: 1,
  },
  flat: {
    boxShadow: 'none',
    backgroundColor: '#1e88e5',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Bar extends Component {
  state = {
    isAdrift: this.props.isAdrift,
  };

  setAdrift(adrift) {
    this.setState({
      isAdrift: adrift,
    });
  }

  handleDrawerToggle = () => {
    const { dispatch } = this.props;
    dispatch(operateMenuOpen(true));
  };

  render() {
    const { classes, collapse, title, position, locales } = this.props;

    const { isAdrift } = this.state;

    const rootClassNames = classNames(classes.appBar, {
      [classes.collapse]: collapse,
      [classes.flat]: !isAdrift,
    });

    return (
      <AppBar position={position} classes={{ root: rootClassNames }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap className={classes.flex}>
            {title}
          </Typography>
          <LanguageMenu />
          <User />
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(
  connect(state => {
    return { collapse: !state[MENU_OPEN] };
  }),
  withLocale({ name: 'AppBar' }),
  withStyles(styles),
)(Bar);
