import React, { Component } from 'react';

import { withStyles } from '@6thquake/react-material/styles';
import Scrollbar from '@6thquake/react-material/Scrollbar';

import routes from '$config/Routers';
import AppBar from '$components/AppBar';

import RouteWithSubRoutes from '../RouteWithSubRoutes';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    flex: 1,
  },
  container: {
    position: 'relative',
    backgroundColor: theme.palette.background.container,
    height: '100vh',
    flexGrow: 1,
  },
  scrollbar: {
    position: 'relative',
    height: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class Container extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { top: 0 };
    this.appBarRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  componentDidMount() {
    const { onPageLoad } = this.props;
    onPageLoad && onPageLoad(true);
  }

  componentWillUnmount() {}

  handleUpdate(values) {
    const { top } = values;
    this.appBarRef.current.setAdrift(top > 0);
  }

  renderThumb({ style, ...props }) {
    const { theme } = this.props;
    const thumbStyle = {
      zIndex: theme.zIndex.drawer + 1,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Scrollbar
            autoHide={false}
            onUpdate={this.handleUpdate}
            renderThumbVertical={this.renderThumb}
          >
            <AppBar position={'fixed'} innerRef={this.appBarRef} />
            <div className={classes.toolbar} />
            {RouteWithSubRoutes(routes)}
          </Scrollbar>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Container);
