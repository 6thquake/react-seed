import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@6thquake/react-material/styles';
import TableRow from '@6thquake/react-material/TableRow';
import TableCell from '@6thquake/react-material/TableCell';
import Grid from '@6thquake/react-material/Grid';
import classnames from 'classnames';
import { withLocale } from '@6thquake/react-material/LocaleProvider';
import compose from 'recompose/compose';
import Icon from './Icon';
import omit from '$utils/omit';

const style = theme => ({
  item: {},
  text: {
    textAlign: 'center',
  },
  iconRoot: {
    width: '100%',
    height: '100%',
  },
  xs: {
    width: '150px',
  },
  sm: {
    width: '200px',
  },
  md: {
    width: '250px',
  },
  lg: {
    width: '300px',
  },
  xl: {
    width: '350px',
  },
});

class NoData extends Component {
  state = {
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
  };

  render() {
    const { sizes } = this.state;
    const { classes, visible, size, text, ...rest } = this.props;
    const itemClassName = classnames(
      {
        [classes[size]]: sizes.includes(size),
      },
      classes.item,
    );

    const restProps = omit(rest, ['changeLocale', 'locale', 'locales']);

    return (
      <React.Fragment {...restProps}>
        <Grid container direction="column" spacing={24} justify="center" alignItems="center">
          <Grid item className={itemClassName}>
            <Icon classes={{ root: classes.iconRoot }} />
          </Grid>
          <Grid item className={classes.text}>
            {text}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

NoData.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.any,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

NoData.defaultProps = {
  text: '',
  size: 'md',
};

export default compose(
  withLocale({ name: 'NoData' }),
  withStyles(style),
)(NoData);
