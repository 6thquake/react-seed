import LocaleProvider from '@6thquake/react-material/LocaleProvider'
import React, {Component} from 'react'
import http from './dao';
import language from '../../utils/language';

const parseLocale = (data) => {
    let locale = {};
    try {
        locale = JSON.parse(data).resourceI18nList
    } catch (err) {
        console.log('资源有误！')
    }
    let en = {};
    let zh = {};
    locale.map((item, index) => {
        if (item.resourceSuffix === '中文') {
            zh[item.resourceLabel] = item.resourceValue
        } else {
            en[item.resourceLabel] = item.resourceValue
        }
    });
    return {zh, en}
};

class EhrmsLocaleProvider extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        locales: {}
    };

    componentDidMount() {
        http.queryResourceI18n({
            param: JSON.stringify({resourceI18n: {}})
        }).then((res) => {
            if (res && res.data && res.data.retValue) {
                let locales = parseLocale(res.data.retValue);
                this.setState({
                    locales
                })
            }
        })
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
        let locale = language.getFormatLang();

        return (
            <LocaleProvider locale={locale} value={value}>
                {children}
            </LocaleProvider>
        );
    }
}

export default EhrmsLocaleProvider;