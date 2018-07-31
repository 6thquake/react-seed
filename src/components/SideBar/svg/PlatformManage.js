import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'react-material/styles';
import SvgIcon from 'react-material/SvgIcon';

const style = theme => ({});

class PlatformManage extends Component {
    render() {
        return (
            <SvgIcon width="16px" height="16px" viewBox="0 0 16 16">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path
                        d="M14,11.744 L14,3.744 L2,3.744 L2,11.744 L14,11.744 Z M14,2.4 C14.3626685,2.4 14.677332,2.533332 14.944,2.8 C15.210668,3.066668 15.344,3.38133152 15.344,3.744 L15.312,11.744 C15.312,12.1066685 15.1840013,12.4159987 14.928,12.672 C14.6719987,12.9280013 14.3626685,13.056 14,13.056 L10.656,13.056 L10.656,14.4 L5.344,14.4 L5.344,13.056 L2,13.056 C1.63733152,13.056 1.322668,12.9280013 1.056,12.672 C0.789332,12.4159987 0.656,12.1066685 0.656,11.744 L0.656,3.744 C0.656,3.38133152 0.789332,3.066668 1.056,2.8 C1.322668,2.533332 1.63733152,2.4 2,2.4 L14,2.4 Z"
                        fill="#FFF"></path>
                </g>
            </SvgIcon>
        )
    }
}

PlatformManage.propTypes = {
    classes: PropTypes.object.isRequired
};

PlatformManage.defaultProps = {};

export default withStyles(style)(PlatformManage)