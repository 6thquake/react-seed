import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

import StateManager from '$core/state/StateManager';

const styles = theme => ({
  root: {},
});

class Hello extends React.Component {
  constructor(props) {
    super(props);

    StateManager.getInstance().setProperties('default', {
      page: 1,
      pageSize: 10,
    });
  }

  render() {
    let properties = StateManager.getInstance().getProperties();

    return (
      <React.Fragment>
        <h1>Hello world! I am page 1.</h1>
        <p>{properties}</p>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withLocale({ name: 'Hello' })(Hello));
