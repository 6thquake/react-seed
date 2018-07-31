import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'react-material/styles';
import SvgIcon from 'react-material/SvgIcon';
import omit from '../../../util/omit';
import classnames from 'classnames';

const style = theme => ({
    container: {
        minHeight: '64px',
        padding: '8px 0',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.87)'
    },
    'cls-1': {
        fill: '#1e88e5'
    },
    'cls-2': {
        fill: '#fff'
    },
    root: {
        width: '100%',
        height: '48px'
    },
    close: {
        width: '240px',
        marginLeft: '-18px'
    }
});

class Logo extends Component {
    state = {};

    render() {
        const {classes, open, ...rest} = this.props;
        const logoClasses = omit(classes, ['container', 'cls-1', 'cls-2', 'close']);
        const logoClassnames = classnames({
            [classes.close]: !open
        });

        return (
            <div className={classes.container}>
                <SvgIcon classes={logoClasses} className={logoClassnames} viewBox="0 0 876.09 237.33" {...rest}>
                    <g>
                        <g>
                            <path className={classes['cls-1']}
                                  d="M201.53,53,113.72,2.31a17.31,17.31,0,0,0-17.28,0L8.64,53A17.27,17.27,0,0,0,0,68V169.36a17.26,17.26,0,0,0,8.64,15L96.44,235a17.31,17.31,0,0,0,17.28,0l87.81-50.7a17.27,17.27,0,0,0,8.63-15V68A17.28,17.28,0,0,0,201.53,53Z"/>
                            <path className={classes['cls-2']}
                                  d="M105.08,54.67A19.31,19.31,0,1,1,85.77,74a19.33,19.33,0,0,1,19.31-19.31m0-10A29.31,29.31,0,1,0,134.39,74a29.31,29.31,0,0,0-29.31-29.31Z"/>
                            <path className={classes['cls-2']}
                                  d="M106,182.85H51.47A11.34,11.34,0,0,1,40,171.79v-2.06a61.79,61.79,0,0,1,104.18-45L137.31,132A51.82,51.82,0,0,0,50,169.73v1.87a1.42,1.42,0,0,0,1.49,1.25H106Z"/>
                            <rect className={classes['cls-2']} x="120.98" y="139.45" width="40" height="10"/>
                            <rect className={classes['cls-2']} x="120.98" y="155.95" width="40" height="10"/>
                            <rect className={classes['cls-2']} x="120.98" y="172.45" width="40" height="10"/>
                            {open && (
                                <React.Fragment>
                                    <path className={classes['cls-2']}
                                          d="M344.89,194.45H265.72V42.88h78.52V58.24H283.33v46.94h58.55v15.37H283.33v58.54h61.56Z"/>
                                    <path className={classes['cls-2']}
                                          d="M479.81,194.45H462.19V119.26H410.31v75.19H392.69V42.88h17.62v60.91h51.88V42.88h17.62Z"/>
                                    <path className={classes['cls-2']}
                                          d="M628.37,194.45h-22l-44.47-68.86H542.33v68.86H524.71V42.88h42.86q21.6,0,34.11,10.47t12.51,29.17a37.08,37.08,0,0,1-9.13,24.65q-9.13,10.8-25.14,14.66Zm-86-84.22h22.23q14,0,22.67-7.57a24.2,24.2,0,0,0,8.7-19.07q0-25.35-30.94-25.35H542.33Z"/>
                                    <path className={classes['cls-2']}
                                          d="M749.11,194.45h-17v-130l-22.88,62.2H692.61l-22.88-62.2v130h-17V42.88h22.88L701,112l25.24-69.07h22.88Z"/>
                                    <path className={classes['cls-2']}
                                          d="M864.59,59.64A79.51,79.51,0,0,0,838.92,55q-13.75,0-22.4,6.28t-8.65,17.89q0,13.75,22.67,24.17,16.76,7.73,22.18,10.74a55.53,55.53,0,0,1,11,8.27,40.82,40.82,0,0,1,9,12.41,37,37,0,0,1,3.39,16.06q0,22.13-14.88,34.32t-35.07,12.19q-19.56,0-34.27-7.73l3.65-15.15q17.29,7.84,30.19,7.84,15,0,24.11-7.78t9.08-21.44A25.74,25.74,0,0,0,853,136q-5.91-7-21.81-14.34-16.32-7.52-21.1-10.26a44.05,44.05,0,0,1-9.51-7.57,35.36,35.36,0,0,1-7.31-10.85,33.08,33.08,0,0,1-2.57-13.11q0-18.8,13.53-29.32T838.49,40a101.27,101.27,0,0,1,30.08,4.62Z"/>
                                </React.Fragment>
                            )}
                        </g>
                    </g>
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