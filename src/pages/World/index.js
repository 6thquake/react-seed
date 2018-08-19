import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {},
});

class World extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history } = this.props;

    return <div>Hello world!</div>;
  }
}

export default withStyles(styles)(withLocale({ name: 'World' })(withRouter(World)));
