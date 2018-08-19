import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {},
});

class Shanghai extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Welcome to shanghai!</div>;
  }
}

export default withStyles(styles)(withLocale({ name: 'Shanghai' })(withRouter(Shanghai)));
