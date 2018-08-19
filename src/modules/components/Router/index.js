import React from 'react';
import store from '$redux';
import compose from 'recompose/compose';

import { connect } from 'react-redux';
import { pageLoaded } from '$redux/actions/pageLoaded';
import { routesUpdated } from '$redux/actions/routesUpdated';

import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import allRoutes from '$config/Routes';

import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import history from './history';

class RouteComponentWrapper extends React.Component {
  state = {
    isMounted: false,
  };

  componentWillUnmount() {
    store.dispatch(pageLoaded(false));
  }

  componentDidMount() {
    this.setState({ isMounted: true });

    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(pageLoaded(true));
    }, 500);
  }

  render() {
    return this.props.children;
  }
}
const Wrapper = connect()(withRouter(RouteComponentWrapper));

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        console.log(allRoutes);
        let branch = matchRoutes(allRoutes, route.path);

        let length = branch.length,
          _match = null,
          _route = null;
        if (length > 0) {
          if (branch[length - 1].match.path !== route.path) {
            _match = branch[length - 1].match;
            _route = branch[length - 1].route;

            if (!_route.routes) {
              _route.routes = [];
            }
            _route.routes.push(route);

            store.dispatch(routesUpdated(new Date()));
          }
        }

        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props =>
              route.render ? (
                route.render({ ...props, ...extraProps, route: route })
              ) : (
                <Wrapper>
                  <route.component {...props} {...extraProps} route={route} />
                </Wrapper>
              )
            }
          />
        );
      })}
    </Switch>
  ) : null;

class RouteComponent extends React.Component {
  render() {
    const { route } = this.props;
    return renderRoutes(route.routes);
  }
}

export default RouteComponent;
export { renderRoutes, history };
