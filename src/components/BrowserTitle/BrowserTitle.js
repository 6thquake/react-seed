import React from 'react';
import {withLocale} from '@6thquake/react-material/LocaleProvider';

function BrowserTitle(props) {
    document.title = props.locales['label.title.ehrms'] || '';
    return <React.Fragment/>;
}

export default withLocale({name: 'ehr'})(BrowserTitle);