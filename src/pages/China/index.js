import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import { renderRoutes } from '$components/Router';

const styles = theme => ({
  root: {},
});

class China extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;

    return (
      <React.Fragment>
        <div>Welcome to china!</div>
        <fieldset>{renderRoutes(route.routes)}</fieldset>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withLocale({ name: 'China' })(China));
