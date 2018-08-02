import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import Objects from './Objects';

export default class Storage {
  put(key, value) {
    let keys = key.split('.'),
      k = keys.shift();

    if (keys.length > 0) {
      let e = this.get(k);

      if (isNil(e) || isNumber(e)) {
        e = {};
      }

      Objects.setProperty(e, keys.join('.'), value);
      value = e;
    }

    this.storage[k] = !isNil(value) ? JSON.stringify(value) : null;
  }

  get(key) {
    let keys = key.split('.');
    let k = keys.shift();
    let e = this.storage[k];
    let value = !isNil(e) ? JSON.parse(e) : null;

    if (keys.length > 0) {
      value = Objects.getProperty(value, keys.join('.'));
    }

    return value;
  }

  remove(key) {
    let keys = key.split('.'),
      k = keys.shift(),
      value = null;

    if (keys.length > 0) {
      let e = this.get(k);

      if (!isNil(e) && !isNumber(e)) {
        value = Objects.removeProperty(e, keys.join('.'));

        this.storage[k] = JSON.stringify(e);
      }
    } else {
      value = this.storage[key];
      delete this.storage[key];
    }

    return value;
  }

  clear() {
    for (let key in this.storage) {
      delete this.storage[key];
    }
  }

  length() {
    return Object.keys(this.storage).length;
  }
}
