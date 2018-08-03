import isString from 'lodash/isString';
import isNil from 'lodash/isNil';

export default class Handler {
  level = 0;

  setNext(hander) {
    this.nextHander = hander;
  }

  handle() {
    if (arguments.length < 1 || !isString(arguments[0])) {
      throw new Error('please specifies the method to be invoked.');
    }

    let methodName = arguments[0];

    let method = this[methodName];

    let args = Array.prototype.slice.call(arguments, 1);

    Array.prototype.splice.call(args, 0, 0, this);

    let result = method.apply(this, args);

    if (!isNil(this.nextHander) && !result) {
      return this.nextHander.handle.apply(this.nextHander, arguments);
    }

    return result;
  }

  getProperties() {}

  getProperty(key) {}

  removeProperty(key) {}

  setProperties(params) {}

  addProperties(params) {}

  setProperty(key, value) {}
}
