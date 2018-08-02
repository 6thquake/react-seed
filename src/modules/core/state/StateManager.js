define(function(require, exports, module) {
  require('com.ctrip.component.pageState.chain.URLHandler');
  require('com.ctrip.component.pageState.chain.SessionHandler');
  require('com.ctrip.component.pageState.chain.LocalHandler');
  require('com.ctrip.component.pageState.chain.DefaultHandler');

  return Class.forName({
    name: 'class com.ctrip.component.pageState.PageStateManager',

    'private PageStateManager': function($state, $location) {
      var urlHandler = new com.ctrip.component.pageState.chain.URLHandler($state, $location);
      var sessionHandler = new com.ctrip.component.pageState.chain.SessionHandler();
      var localHandler = new com.ctrip.component.pageState.chain.LocalHandler();
      var defaultHandler = new com.ctrip.component.pageState.chain.DefaultHandler();

      urlHandler.setNext(sessionHandler);
      sessionHandler.setNext(localHandler);
      localHandler.setNext(defaultHandler);

      this.handler = urlHandler;
    },

    'static getInstance': function($state, $location) {
      var instance = com.ctrip.component.pageState.PageStateManager.instance;

      if (!instance) {
        instance = new com.ctrip.component.pageState.PageStateManager($state, $location);
        com.ctrip.component.pageState.PageStateManager.instance = instance;
      }

      return instance;
    },

    getProperties: function() {
      var handler = this.handler,
        pros = [],
        properties = {};

      while (!Object.isNull(handler)) {
        pros.push(handler.getProperties());
        handler = handler.nextHander;
      }

      for (var i = pros.length; i >= 0; i--) {
        Object.extend(properties, pros[i]);
      }

      return properties;
    },

    removeProperty: function(key) {
      var handler = this.handler,
        value = null,
        params = [];

      while (!Object.isNull(handler)) {
        value = handler.removeProperty(key);
        if (value) {
          params.push(value);
        }
        handler = handler.nextHander;
      }

      return params;
    },

    getProperty: function(key) {
      return this.handler.handle('getProperty', key);
    },

    setProperty: function(level, key, value) {
      this.handler.handle('setProperty', level, key, value);
    },

    setProperties: function(level, params) {
      this.handler.handle('setProperties', level, params);
    },

    addProperties: function(level, params) {
      this.handler.handle('addProperties', level, params);
    },

    updateProperties: function(level, params) {
      this.handler.handle('updateProperties', level, params);
    },

    setExcludes: function(level, excludes) {
      this.handler.handle('setExcludes', level, excludes);
    },
  });
});
