import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@6thquake/react-material/styles';
import SvgIcon from '@6thquake/react-material/SvgIcon';

const style = theme => ({});

class SystemManage extends Component {
    render() {
        return (
            <SvgIcon width="16px" height="16px" viewBox="0 0 16 16">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path
                        d="M2,3.744 L14,3.744 L14,5.056 L2,5.056 L2,3.744 Z M2,7.744 L2,6.4 L14,6.4 L14,7.744 L2,7.744 Z M2,13.056 L2,11.744 L14,11.744 L14,13.056 L2,13.056 Z M2,10.4 L2,9.056 L14,9.056 L14,10.4 L2,10.4 Z"
                        fill="#FFF"></path>
                </g>
            </SvgIcon>
        )
    }
}

SystemManage.propTypes = {
    classes: PropTypes.object.isRequired
};

SystemManage.defaultProps = {};

export default withStyles(style)(SystemManage)