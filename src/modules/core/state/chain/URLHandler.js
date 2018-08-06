import isArray from 'lodash';
import config from '$config';
import LocationManager from '$utils/Location';
import Handler from '../Handler';

const initialUrl = (global || window).location.href;

const $location = LocationManager.getLocation();
$location.$$parseLinkUrl(initialUrl, initialUrl);

const getKey = function(key) {
  if (key) {
    let module = [config.name, $location.path()].join('.'),
      index = key.indexOf(module);

    if (index === 0) {
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

  constructor() {
    super();
  }

  getProperties() {
    return {
      ...$location.search(),
    };
  }

  removeProperty(key) {
    key = getKey(key);

    let properties = this.getProperties();

    let value = properties[key];

    delete properties[key];

    $location.search(properties);

    return value;
  }

  getProperty(key) {
    key = getKey(key);

    let properties = this.getProperties();

    return properties[key];
  }

  setProperty(level, key, value) {
    if (this.level === level || this.levelName === level) {
      let params = {};
      params[getKey(key)] = value;

      this.addProperties(level, params);
    }
  }

  setProperties(level, params) {
    if (this.level === level || this.levelName === level) {
      try {
        let properties = this.filterProperties(params);
        $location.search(properties);
      } catch (e) {}
    }
  }

  addProperties(level, params) {
    this.updateProperties(level, params);
  }

  updateProperties(level, params) {
    if (this.level === level || this.levelName === level) {
      if (params) {
        try {
          let properties = {
            ...this.getProperties(),
            ...this.filterProperties(params),
          };

          $location.search(properties);
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
    if (this.level === level || this.levelName === level) {
      if (isArray(excludes)) {
        this.excludes.append(excludes);
      } else {
        this.excludes.push(excludes);
      }
    }
  }
}
