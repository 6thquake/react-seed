import config from '$config';
import LocationManager from '$utils/Location';
import Handler from '../Handler';

const initialUrl = (global || window).location.href;

const $location = LocationManager.getLocation();
$location.$$parseLinkUrl(initialUrl, initialUrl);

const getKey = function(key) {
  let module = [config.name, $location.path()].join('.');
  if (key) {
    if (key.indexOf(module) === 0) {
      return key;
    } else {
      key = `${module}.${key}`;
      return key;
    }
  } else {
    key = module;
  }

  return key;
};

export default class StorageHandler extends Handler {
  level = 0;
  excludes = [];
  storage = null;

  constructor() {
    super();
  }

  getProperties() {
    return this.storage.get(getKey());
  }

  removeProperty(key) {
    return this.storage.remove(getKey(key));
  }

  getProperty(key) {
    return this.storage.get(getKey(key));
  }

  setProperty(level, key, value) {
    if (this.level === level || this.levelName === level) {
      if (!this.excludes.contains(key.split('.').pop())) {
        this.storage.put(getKey(key), value);
      }
    }
  }

  setProperties(level, params) {
    if (this.level === level || this.levelName === level) {
      this.storage.put(getKey(), this.filterProperties(params));
    }
  }

  addProperties(level, params) {
    this.updateProperties(level, params);
  }

  updateProperties(level, params) {
    if (this.level === level || this.levelName === level) {
      if (params) {
        let key = getKey();
        let values = { ...this.storage.get(key), ...this.filterProperties(params) };

        this.storage.put(key, values);
      }
    }
  }

  filterProperties(params) {
    let data = {};

    for (let k in params) {
      if (params.hasOwnProperty(k) && !this.excludes.includes(k)) {
        data[k] = params[k];
      }
    }

    return data;
  }

  setExcludes(level, excludes) {
    if (this.level === level || this.levelName === level) {
      if (Object.isArray(excludes)) {
        this.excludes.append(excludes);
      } else {
        this.excludes.push(excludes);
      }
    }
  }
}
