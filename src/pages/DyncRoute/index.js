import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import { renderRoutes } from '$components/Router';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Link from 'react-router-dom/Link';
import { loadComponent } from '$components/AsyncComponent';
import { withRouter } from 'react-router-dom';

const China = loadComponent(() => import('$pages/China'));
const Shanghai = loadComponent(() => import('$pages/Shanghai'));
const RouteTest = loadComponent(() => import('$pages/DyncRoute/RouteTest'));

const styles = theme => ({
  root: {},
});

class DyncRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;

    const routes = [
      {
        path: '/dr/a',
        name: 'china',
        component: China,
        routes: [
          {
            path: '/dr/a/b',
            name: 'shanghai',
            component: Shanghai,
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        <div>Welcome to dr!</div>
        <Link to="/dr/a/b">/dr/a/b</Link>
        <Link to="/dr/c/d">/dr/c/d</Link>
        {
          <Switch>
            <Route path="/dr/c" component={RouteTest} />
            <fieldset>{renderRoutes(routes)}</fieldset>
          </Switch>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withLocale({ name: 'DyncRoute' })(withRouter(DyncRoute)));
