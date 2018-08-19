import React, { Component } from 'react';

import { withRouter, Route, Link } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import routes from '$config/Routes';

import Breadcrumb from '@6thquake/react-material/Breadcrumb';
import { withStyles } from '@6thquake/react-material/styles';

const style = theme => ({});

class Breadcrumb2 extends Component {
  constructor(props) {
    super(props);
  }

  load(elements, parent) {
    if (Array.isArray(elements) && elements.length > 0) {
      let element = null,
        state = null;
      for (let i = 0, len = elements.length; i < len; i++) {
        element = { ...elements[i] };
        if (element.path) {
          if (element.path.charAt(0) != '/') {
            element.path = `${parent.path}/${element.path}`;
          }
          this.routes[element.path] = element;
        }
        this.load(element.routes, element);
      }
    }
  }

  itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
  }

  render() {
    const { match, location, history, classes } = this.props;

    let branch = matchRoutes(routes, location.pathname);

    if (location.pathname != '/') {
      let home = matchRoutes(routes, '/');
      branch = home.concat(branch);
    }

    let _routes = branch.map(route => route.route);

    return <Breadcrumb routes={_routes} itemRender={this.itemRender} separator=">" color="white" />;
  }
}

export default withStyles(style, { withTheme: true })(
  withRouter(
    connect(state => ({
      location: state.router.location,
      changed: state.routesUpdated,
    }))(Breadcrumb2),
  ),
);
