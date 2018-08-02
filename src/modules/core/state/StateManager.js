import URLHandler from './chain/URLHandler';
import SessionHandler from './chain/SessionHandler';
import LocalHandler from './chain/LocalHandler';
import DefaultHandler from './chain/DefaultHandler';

import isNil from 'lodash/isNil';

export default class StateManager {
  constructor() {
    var urlHandler = new URLHandler();
    var sessionHandler = new SessionHandler();
    var localHandler = new LocalHandler();
    var defaultHandler = new DefaultHandler();

    urlHandler.setNext(sessionHandler);
    sessionHandler.setNext(localHandler);
    localHandler.setNext(defaultHandler);

    this.handler = urlHandler;
  }

  static getInstance() {
    var instance = StateManager.instance;

    if (!instance) {
      instance = new StateManager();
      StateManager.instance = instance;
    }

    return instance;
  }

  getProperties() {
    var handler = this.handler,
      pros = [],
      properties = {};

    while (!isNil(handler)) {
      pros.push(handler.getProperties());
      handler = handler.nextHander;
    }

    for (var i = pros.length; i >= 0; i--) {
      Object.extend(properties, pros[i]);
    }

    return properties;
  }

  removeProperty(key) {
    var handler = this.handler,
      value = null,
      params = [];

    while (!isNil(handler)) {
      value = handler.removeProperty(key);
      if (value) {
        params.push(value);
      }
      handler = handler.nextHander;
    }

    return params;
  }

  getProperty(key) {
    return this.handler.handle('getProperty', key);
  }

  setProperty(level, key, value) {
    this.handler.handle('setProperty', level, key, value);
  }

  setProperties(level, params) {
    this.handler.handle('setProperties', level, params);
  }

  addProperties(level, params) {
    this.handler.handle('addProperties', level, params);
  }

  updateProperties(level, params) {
    this.handler.handle('updateProperties', level, params);
  }

  setExcludes(level, excludes) {
    this.handler.handle('setExcludes', level, excludes);
  }
}
