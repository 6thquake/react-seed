import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import Objects from '$utils/Objects';
import StorageHandler from './StorageHandler';

class DefaultStorage {
  storage = new Map();

  put(key, value) {
    let keys = key.split('.');
    let k = keys.shift();

    if (keys.length > 0) {
      let e = this.get(k);

      if (isNil(e) || isNumber(e)) {
        e = {};
      }

      Objects.setProperty(e, keys.join('.'), value);
      value = e;
    }

    this.storage.set(k, value);
  }

  get(key) {
    let keys = key.split('.');
    let k = keys.shift();
    let value = this.storage.get(k);

    if (keys.length > 0) {
      value = Objects.getProperty(value, keys.join('.'));
    }

    return value;
  }

  remove(key) {
    let keys = key.split('.');
    let k = keys.shift();
    let value = null;

    if (keys.length > 0) {
      let e = this.get(k);

      if (!isNil(e) && !isNumber(e)) {
        value = Objects.removeProperty(e, keys.join('.'));
      }
    } else {
      value = this.storage.remove(key);
    }

    return value;
  }

  clear() {
    this.storage.clear();
  }

  length() {
    return this.storage.size;
  }

  size() {
    return this.length();
  }
}

export default class DefaultHandler extends StorageHandler {
  level = 4;
  levelName = 'default';

  constructor() {
    super();
    this.storage = new DefaultStorage();
  }
}
