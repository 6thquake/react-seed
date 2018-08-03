import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

const styles = theme => ({
  root: {},
});

class World extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello world! I am page 2.</div>;
  }
}

export default withStyles(styles)(withLocale({ name: 'World' })(World));
