import isFunction from 'lodash/isFunction';

/**
 *
 */
class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(e) {
    this.observers.push(e);
    return this;
  }

  deleteObserver(e) {
    const index = this.observers.findIndex(q => q === e);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
    return this;
  }

  clearObservers() {
    this.observers = [];
  }

  notifyObservers() {
    const parameter = [].slice.call(arguments);
    parameter.push(this);

    let observer = null;
    for (let i = 0, len = this.observers.length; i < len; i++) {
      observer = this.observers[i];
      if (isFunction(observer)) {
        observer.apply(observer, parameter);
      } else if (isFunction(observer.update)) {
        observer.update.apply(observer, parameter);
      }
    }
  }

  countObservers() {
    return this.observers.length;
  }
}

export default Observable;
