import React, { Component } from 'react';
import LocaleProvider from '@6thquake/react-material/LocaleProvider';
import config from '$config';
import en, { zh } from './languages';

class SeedLocaleProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    locales: {},
  };

  static getLocaleResource = () => {};

  static setLocale = lang => {};

  componentDidMount() {}

  getDefaultLocale() {
    return config.locale || '';
  }

  render() {
    const { children } = this.props;

    let value = {
      en: en,
      zh: zh,
    };

    let locale = this.getDefaultLocale();

    return (
      <LocaleProvider locale={locale} value={value}>
        {children}
      </LocaleProvider>
    );
  }
}

export default SeedLocaleProvider;
