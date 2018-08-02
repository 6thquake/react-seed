import Handler from './Handler';

import config from '$config';

const getKey = function(key) {
  let module = config.name;

  let stateName = module + '.' + location.pathname;

  if (key) {
    if (key.indexOf(module) == 0) {
      return key;
    } else {
      key = stateName + '.' + key;
      return key;
    }
  } else {
    key = stateName;
  }

  return key;
};

export default class StorageHandler extends Handler {
  level = 0;

  excludes = [];

  storage = null;

  constructor() {}

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
    if (this.level == level || this.levelName == level) {
      if (!this.excludes.contains(key.split('.').pop())) {
        this.storage.put(getKey(key), value);
      }
    }
  }

  setProperties(level, params) {
    if (this.level == level || this.levelName == level) {
      this.storage.put(getKey(), this.filterProperties(params));
    }
  }

  addProperties(level, params) {
    this.updateProperties(level, params);
  }

  updateProperties(level, params) {
    if (this.level == level || this.levelName == level) {
      if (params) {
        var key = getKey(),
          values = this.storage.get(key) || {},
          params = this.filterProperties(params);

        this.storage.put(key, { ...values, ...params });
      }
    }
  }

  filterProperties(params) {
    var data = {};

    for (var k in params) {
      if (params.hasOwnProperty(k) && !this.excludes.contains(k)) {
        data[k] = params[k];
      }
    }

    return data;
  }

  setExcludes(level, excludes) {
    if (this.level == level || this.levelName == level) {
      if (Object.isArray(excludes)) {
        this.excludes.append(excludes);
      } else {
        this.excludes.push(excludes);
      }
    }
  }
}
