import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@6thquake/react-material/styles';
import SvgIcon from '@6thquake/react-material/SvgIcon';

const style = theme => ({
    root: {
        width: '100%',
        height: '100%'
    }
});

class Avatar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <SvgIcon classes={{root: classes.root}} width="40px" height="40px" viewBox="0 0 40 40">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g fill="#BBDEFB" fillRule="nonzero">
                        <path
                            d="M20.016628,0 C8.98317085,0 0.0384563512,8.95344957 0.0384563512,19.9981612 C0.0384563512,31.042713 8.98317085,39.9964824 20.016628,39.9964824 C31.0510436,39.9964824 39.9958379,31.042713 39.9958379,19.9981612 C39.9958379,8.95344957 31.0510436,0 20.016628,0 Z M20.016628,7.19919895 C24.4308814,7.19919895 28.0084397,10.7808106 28.0084397,15.1984954 C28.0084397,19.6164201 24.4308814,23.1979518 20.016628,23.1979518 C15.6038921,23.1979518 12.0258545,19.6164201 12.0258545,15.1984954 C12.0258146,10.7808106 15.6038521,7.19919895 20.016628,7.19919895 Z M20.0186247,38.3971268 C14.3104729,38.3971268 9.21027493,35.7924128 5.83897518,31.7057835 C9.21035477,27.9753927 14.3097941,25.5977647 20.016628,25.5977647 C25.7250193,25.5977647 30.8255368,27.9760323 34.1969164,31.7073025 C30.8255767,35.7930523 25.7259777,38.3971268 20.0186247,38.3971268 Z"
                        ></path>
                    </g>
                </g>
            </SvgIcon>
        )
    }
}

Avatar.propTypes = {
    classes: PropTypes.object.isRequired
};

Avatar.defaultProps = {};

export default withStyles(style)(Avatar)