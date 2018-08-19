import React from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import Typography from '@6thquake/react-material/Typography';
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textAlign: 'right',
    paddingRight: 20,
    verticalAlign: 'bottom',
    width: 200,
    display: 'inline-block',
  },
});
class LabelFor extends React.Component {
  render() {
    const { classes, component, label } = this.props;
    return (
      <Typography color="textSecondary">
        <span className={classes.label}>{label}</span>
        {component}
      </Typography>
    );
  }
}
export default withStyles(styles, { withTheme: true })(LabelFor);
