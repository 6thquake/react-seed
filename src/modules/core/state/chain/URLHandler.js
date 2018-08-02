import qs from 'qs';
import isArray from 'lodash';

import config from '$config';

import Handler from '../Handler';

const getKey = function(key) {
  if (key) {
    let module = config.name,
      index = key.indexOf(module);

    if (index == 0) {
      return key.substring(index + module.length + 1);
    } else {
      return key;
    }
  }

  return key;
};

export default class URLHandler extends Handler {
  level = 1;
  levelName = 'url';
  excludes = [];
  mode: 'hash'; //'search'

  constructor() {}

  getProperties() {
    let search = qs.parse(location.search);
    let hash = qs.parse(location.hash);

    return {
      ...hash,
      ...search,
    };
  }

  removeProperty(key) {
    key = getKey(key);

    let properties = this.getProperties();

    let value = properties.key;

    delete properties.key;

    let queryString = qs.stringify(properties);

    if (mode == 'hash') {
      location.hash = queryString;
    } else {
      location.search = queryString;
    }

    return value;
  }

  getProperty(key) {
    key = getKey(key);

    let properties = this.getProperties();

    return properties.key;
  }

  setProperty(level, key, value) {
    if (this.level == level || this.levelName == level) {
      var params = {};
      params[getKey(key)] = value;

      this.addProperties(level, params);
    }
  }

  setProperties(level, params) {
    if (this.level == level || this.levelName == level) {
      try {
        let properties = this.filterProperties(params);
        let queryString = qs.stringify(properties);

        if (mode == 'hash') {
          location.hash = queryString;
        } else {
          location.search = queryString;
        }
      } catch (e) {}
    }
  }

  addProperties(level, params) {
    this.updateProperties(level, params);
  }

  updateProperties(level, params) {
    if (this.level == level || this.levelName == level) {
      if (params) {
        try {
          let properties = {
            ...this.getProperties(),
            ...this.filterProperties(params),
          };

          let queryString = qs.stringify(properties);

          if (mode == 'hash') {
            location.hash = queryString;
          } else {
            location.search = queryString;
          }
        } catch (e) {}
      }
    }
  }

  filterProperties(params) {
    let data = {};

    for (let k in params) {
      if (params.hasOwnProperty(k) && !this.excludes.contains(k)) {
        data[k] = params[k];
      }
    }

    return data;
  }

  setExcludes(level, excludes) {
    if (this.level == level || this.levelName == level) {
      if (isArray(excludes)) {
        this.excludes.append(excludes);
      } else {
        this.excludes.push(excludes);
      }
    }
  }

  setMode(mode) {
    this.mode = mode;
  }
}
