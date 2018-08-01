import React from 'react';
import {withLocale} from '@6thquake/react-material/LocaleProvider';

function BrowserTitle(props) {
    document.title = props.title || '';
    return <React.Fragment/>;
}

export default withLocale({name: 'BrowserTitle'})(BrowserTitle);