  import StorageHandler from './StorageHandler';
  import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import Objects from '$utils/Objects';

  class DefaultStorage {

    storage = new  Map();

    put: function(key, value) {

      var keys = key.split("."),
        k = keys.shift();

      if (keys.length > 0) {
        var e = this.get(k);

        if (isNil(e) || isNumber(e)) {
          e = {};
        }

        Objects.setProperty(e, keys.join("."), value);
        value = e;
      }

      this.storage.set(k, value);
    },

    get: function(key) {

      var keys = key.split("."),
        k = keys.shift(),
        value = this.storage.get(k);

      if (keys.length > 0) {
        value = Objects.getProperty(value, keys.join("."));
      }

      return value;
    },

    remove: function(key) {

      var keys = key.split("."),
        k = keys.shift(),
        value = null;

      if (keys.length > 0) {
        var e = this.get(k);

        if (!isNil(e) && !isNumber(e)) {
          value = Objects.removeProperty(e, keys.join("."));
        }
      } else {
        value = this.storage.remove(key);
      }

      return value;
    },

    clear: function() {
      this.storage.clear();
    },

    length: function() {
      return this.storage.size;
    },

    size: function() {
      return this.length();
    }

  });


  export default class DefaultHandler extends StorageHandler{
    level= 4;
      levelName= 'default';

      constructor: function() {
        this.storage = new DefaultStorage();
      }
  }

    

  });
});