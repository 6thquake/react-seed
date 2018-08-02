import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@6thquake/react-material/styles';
import SvgIcon from '@6thquake/react-material/SvgIcon';
import omit from '$utils/omit';
import classnames from 'classnames';

const style = theme => ({
    root: {
        minHeight: '64px',
        padding: '8px 0',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.87)'
    },
    container: {
        width: '100%',
        height: '68px',
        fontSize: '68px',
        marginTop: '10px',
        color: '#1976d2',
    },
    close: {
        marginLeft: '10px'
    },
    cl1: {
        fill: 'rgb(132, 241, 246)',
        opacity: 0.55,
        isolation: 'isolate',
      },
      cl2: {
        fill: 'rgb(36, 136, 199)',
      },
      cl3: {
        fill: 'rgb(132, 241, 246)',
        stroke: 'rgb(132, 241, 246)',
        strokeMiterlimit: 10,
        strokeWidth: '0.06px',
      },
});

class Logo extends Component {
    state = {};

    render() {
        const {classes, open, ...rest} = this.props;
        const logoClassnames = classnames({
            [classes.container]: true,
            [classes.close]: !open
        });

        return (
            <div className={classes.root}>
                <SvgIcon className={logoClassnames} {...rest}>
                    <polygon className={classes.cl1} points="5.6 9.8 6.8 11.6 5.6 9.8 5.6 9.8" />
    <polygon className={classes.cl2} points="1 0.4 0.1 1 0.5 14.3 1.4 15.6 1 0.4" />
    <polygon className={classes.cl2} points="5.6 8 5.6 9.8 6.8 11.6 9 12.9 5.6 8" />
    <polygon className={classes.cl2} points="12.3 7.6 10 11.4 10.1 13.2 12.1 14.3 12.3 7.6" />
    <polygon className={classes.cl2} points="12.6 0.9 10.2 1.5 8 4.8 9.1 6.5 12.6 0.9" />
    <polygon
      className={classes.cl3}
      points="12.6 0.9 9.1 6.5 8 4.8 5.4 0.6 1 0.4 1.4 15.6 5.6 15.1 5.6 9.8 5.6 9.8 5.6 8 9 12.9 10 11.4 12.3 7.6 12.1 14.3 15.4 13.9 15.9 0.9 12.6 0.9"
    />
                </SvgIcon>
            </div>
        )
    }
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired
};

Logo.defaultProps = {};

export default withStyles(style)(Logo)