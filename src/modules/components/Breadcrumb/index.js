import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import routes from '$config/Routes';

import Breadcrumb from '@6thquake/react-material/Breadcrumb';

class Breadcrumb2 extends Component {
  // state = {
  //   routes,
  // };

  constructor(props) {
    super(props);

    // this.routes = {};
    // this.load(routes);
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

  render() {
    const { match, location, history } = this.props;

    const branch = matchRoutes(routes, location.pathname);

    let breadcrumb = {};

    branch.map(({ route, match }) => {
      breadcrumb[match.url] = { ...route, ...match };
    });

    return (
      <React.Fragment>
        <Breadcrumb nameMap={breadcrumb} separator=">" />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  location: state.router.location,
  changed: state.routesUpdated,
}))(withRouter(Breadcrumb2));
