import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

const styles = theme => ({
  root: {},
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>React Material Seed</div>;
  }
}

export default withStyles(styles)(
  withLocale({
    name: 'World',
  })(Home),
);
