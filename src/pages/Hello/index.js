import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import { withLocale } from '@6thquake/react-material/LocaleProvider';

const styles = theme => ({
  root: {},
});

class GradeModule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello world! I am page 1.</div>;
  }
}

GradeModule = withLocale({ name: 'ehr' })(GradeModule);
export default withStyles(styles)(GradeModule);
