import LocaleProvider from '@6thquake/react-material/LocaleProvider'
import React, {Component} from 'react'
import http from './dao';
import language from '$utils/language';


class LocaleProvider extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        locales: {}
    };

    componentDidMount() {
        
    }
    
    getDefaultLocale(){
        return 'en';
    }

    render() {
        const {children} = this.props;

        let value = {
            en: {
                ehr: {
                    locales: this.state.locales['en'] || {}
                }
            },
            zh: {
                ehr: {
                    locales: this.state.locales['zh'] || {}
                }
            }
        };

        let locale = this.getDefaultLocale();

        return (
            <LocaleProvider locale={locale} value={value}>
                {children}
            </LocaleProvider>
        );
    }
}

export default LocaleProvider;