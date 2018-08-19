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
    location: null,
  };

  constructor(props) {
    super(props);

    const { loaded, dispatch } = this.props;
    if (this.props.loaded) {
      dispatch(pageLoaded(false));
    }
  }

  componentWillUnmount() {
    const { history, dispatch } = this.props;
    const { location } = this.state;

    let branch = matchRoutes(allRoutes, location.pathname);

    let routes = branch.map(route => route.route);

    let index = routes.findIndex(element => element.path === history.location.pathname);

    dispatch(pageLoaded(index !== -1));
  }

  componentDidMount() {
    const { history, dispatch } = this.props;

    setTimeout(() => {
      dispatch(pageLoaded(true));
    }, 500);

    this.setState({ isMounted: true, location: history.location });
  }

  render() {
    return this.props.children;
  }
}
const Wrapper = connect(state => ({
  loaded: state.pageLoaded,
}))(withRouter(RouteComponentWrapper));

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
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
            render={props => (
              <Wrapper>
                {route.render ? (
                  route.render({ ...props, ...extraProps, route: route })
                ) : (
                  <route.component {...props} {...extraProps} route={route} />
                )}
              </Wrapper>
            )}
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
