import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import Route from 'react-router-dom/Route';
import { loadComponent } from '$components/AsyncComponent';
const Shanghai = loadComponent(() => import('$pages/Shanghai'));

const styles = theme => ({
  root: {},
});

class RouteTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome to RouteTest! <Route path="/dr/c/d" component={Shanghai} />
      </div>
    );
  }
}

export default withStyles(styles)(withLocale({ name: 'RouteTest' })(RouteTest));
