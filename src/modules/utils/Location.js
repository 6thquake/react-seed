import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import forEach from 'lodash/forEach';

import config from '$config';

import Url from './Url';

/* global stripHash: true */

let PATH_MATCH = /^([^?#]*)(\?([^#]*))?(#(.*))?$/,
  DEFAULT_PORTS = { http: 80, https: 443, ftp: 21 };

function toInt(str) {
  return parseInt(str, 10);
}

/**
 * Tries to decode the URI component without throwing an exception.
 *
 * @private
 * @param str value potential URI component to check.
 * @returns {boolean} True if `value` can be decoded
 * with the decodeURIComponent function.
 */
function tryDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    // Ignore any invalid uri component.
  }
}

/**
 * Parses an escaped url query string into key-value pairs.
 * @returns {Object.<string,boolean|Array>}
 */
function parseKeyValue(/**string*/ keyValue) {
  var obj = {};
  forEach((keyValue || '').split('&'), function(keyValue) {
    var splitPoint, key, val;
    if (keyValue) {
      key = keyValue = keyValue.replace(/\+/g, '%20');
      splitPoint = keyValue.indexOf('=');
      if (splitPoint !== -1) {
        key = keyValue.substring(0, splitPoint);
        val = keyValue.substring(splitPoint + 1);
      }
      key = tryDecodeURIComponent(key);
      if (!isNil(key)) {
        val = !isNil(val) ? tryDecodeURIComponent(val) : true;
        if (!hasOwnProperty.call(obj, key)) {
          obj[key] = val;
        } else if (isArray(obj[key])) {
          obj[key].push(val);
        } else {
          obj[key] = [obj[key], val];
        }
      }
    }
  });
  return obj;
}

function toKeyValue(obj) {
  let parts = [];
  forEach(obj, function(value, key) {
    if (isArray(value)) {
      forEach(value, function(arrayValue) {
        parts.push(
          encodeUriQuery(key, true) +
            (arrayValue === true ? '' : '=' + encodeUriQuery(arrayValue, true)),
        );
      });
    } else {
      parts.push(
        encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)),
      );
    }
  });
  return parts.length ? parts.join('&') : '';
}

function encodeUriQuery(val, pctEncodeSpaces) {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%3B/gi, ';')
    .replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
}

/**
 * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
 * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set (pchar) allowed in path
 * segments:
 *    segment       = *pchar
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
function encodeUriSegment(val) {
  return encodeUriQuery(val, true)
    .replace(/%26/gi, '&')
    .replace(/%3D/gi, '=')
    .replace(/%2B/gi, '+');
}

/**
 * Encode path using encodeUriSegment, ignoring forward slashes
 *
 * @param {string} path Path to encode
 * @returns {string}
 */
function encodePath(path) {
  let segments = path.split('/'),
    i = segments.length;

  while (i--) {
    // decode forward slashes to prevent them from being double encoded
    segments[i] = encodeUriSegment(segments[i].replace(/%2F/g, '/'));
  }

  return segments.join('/');
}

function decodePath(path, html5Mode) {
  let segments = path.split('/'),
    i = segments.length;

  while (i--) {
    segments[i] = decodeURIComponent(segments[i]);
    if (html5Mode) {
      // encode forward slashes to prevent them from being mistaken for path separators
      segments[i] = segments[i].replace(/\//g, '%2F');
    }
  }

  return segments.join('/');
}

function normalizePath(pathValue, searchValue, hashValue) {
  let search = toKeyValue(searchValue),
    hash = hashValue ? '#' + encodeUriSegment(hashValue) : '',
    path = encodePath(pathValue);

  return path + (search ? '?' + search : '') + hash;
}

function parseAbsoluteUrl(absoluteUrl, locationObj) {
  let parsedUrl = Url.urlResolve(absoluteUrl);

  locationObj.$$protocol = parsedUrl.protocol;
  locationObj.$$host = parsedUrl.hostname;
  locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
}

let DOUBLE_SLASH_REGEX = /^\s*[\\/]{2,}/;
function parseAppUrl(url, locationObj, html5Mode) {
  if (DOUBLE_SLASH_REGEX.test(url)) {
    throw Error('badpath', 'Invalid url "{0}".', url);
  }

  let prefixed = url.charAt(0) !== '/';
  if (prefixed) {
    url = '/' + url;
  }
  let match = Url.urlResolve(url);
  let path =
    prefixed && match.pathname.charAt(0) === '/' ? match.pathname.substring(1) : match.pathname;
  locationObj.$$path = decodePath(path, html5Mode);
  locationObj.$$search = parseKeyValue(match.search);
  locationObj.$$hash = decodeURIComponent(match.hash);

  // make sure path starts with '/';
  if (locationObj.$$path && locationObj.$$path.charAt(0) !== '/') {
    locationObj.$$path = '/' + locationObj.$$path;
  }
}

function startsWith(str, search) {
  return str.slice(0, search.length) === search;
}
/**
 *
 * @param {string} base
 * @param {string} url
 * @returns {string} returns text from `url` after `base` or `undefined` if it does not begin with
 *                   the expected string.
 */
function stripBaseUrl(base, url) {
  if (startsWith(url, base)) {
    return url.substr(base.length);
  }
}

function locationGetter(property) {
  return /** @this */ function() {
    return this[property];
  };
}

function locationGetterSetter(property, preprocess) {
  return /** @this */ function(value) {
    if (isNil(value)) {
      return this[property];
    }

    this[property] = preprocess(value);
    this.$$compose();

    return this;
  };
}

class Location {
  /**
   * Ensure absolute URL is initialized.
   * @private
   */
  $$absUrl = '';

  /**
   * Are we in html5 mode?
   * @private
   */
  $$html5 = false;

  /**
   * Has any change been replacing?
   * @private
   */
  $$replace = false;

  constructor(appBase, appBaseNoFile, basePrefix) {
    this.appBase = appBase;
    this.appBaseNoFile = appBaseNoFile;
    this.basePrefix = basePrefix || '';
  }

  /**
   * Compose url and update `url` and `absUrl` property
   * @private
   */
  $$compose() {
    this.$$url = normalizePath(this.$$path, this.$$search, this.$$hash);
    this.$$absUrl = this.$$normalizeUrl(this.$$url);
    this.$$urlUpdatedByLocation = true;
  }

  /**
   * @ngdoc method
   * @name $location#absUrl
   *
   * @description
   * This method is getter only.
   *
   * Return full URL representation with all segments encoded according to rules specified in
   * [RFC 3986](http://www.ietf.org/rfc/rfc3986.txt).
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let absUrl = $location.absUrl();
   * // => "http://example.com/#/some/path?foo=bar&baz=xoxo"
   * ```
   *
   * @return {string} full URL
   */
  absUrl = locationGetter('$$absUrl');

  /**
   * @ngdoc method
   * @name $location#url
   *
   * @description
   * This method is getter / setter.
   *
   * Return URL (e.g. `/path?a=b#hash`) when called without any parameter.
   *
   * Change path, search and hash, when called with parameter and return `$location`.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let url = $location.url();
   * // => "/some/path?foo=bar&baz=xoxo"
   * ```
   *
   * @param {string=} url New URL without base prefix (e.g. `/path?a=b#hash`)
   * @return {string} url
   */
  url(url) {
    if (isNil(url)) {
      return this.$$url;
    }

    let match = PATH_MATCH.exec(url);
    if (match[1] || url === '') this.path(decodeURIComponent(match[1]));
    if (match[2] || match[1] || url === '') this.search(match[3] || '');
    this.hash(match[5] || '');

    return this;
  }

  /**
   * @ngdoc method
   * @name $location#protocol
   *
   * @description
   * This method is getter only.
   *
   * Return protocol of current URL.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let protocol = $location.protocol();
   * // => "http"
   * ```
   *
   * @return {string} protocol of current URL
   */
  protocol = locationGetter('$$protocol');

  /**
   * @ngdoc method
   * @name $location#host
   *
   * @description
   * This method is getter only.
   *
   * Return host of current URL.
   *
   * Note: compared to the non-AngularJS version `location.host` which returns `hostname:port`, this returns the `hostname` portion only.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let host = $location.host();
   * // => "example.com"
   *
   * // given URL http://user:password@example.com:8080/#/some/path?foo=bar&baz=xoxo
   * host = $location.host();
   * // => "example.com"
   * host = location.host;
   * // => "example.com:8080"
   * ```
   *
   * @return {string} host of current URL.
   */
  host = locationGetter('$$host');

  /**
   * @ngdoc method
   * @name $location#port
   *
   * @description
   * This method is getter only.
   *
   * Return port of current URL.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let port = $location.port();
   * // => 80
   * ```
   *
   * @return {Number} port
   */
  port = locationGetter('$$port');

  /**
   * @ngdoc method
   * @name $location#path
   *
   * @description
   * This method is getter / setter.
   *
   * Return path of current URL when called without any parameter.
   *
   * Change path when called with parameter and return `$location`.
   *
   * Note: Path should always begin with forward slash (/), this method will add the forward slash
   * if it is missing.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let path = $location.path();
   * // => "/some/path"
   * ```
   *
   * @param {(string|number)=} path New path
   * @return {(string|object)} path if called with no parameters, or `$location` if called with a parameter
   */
  path = locationGetterSetter('$$path', function(path) {
    path = path !== null ? path.toString() : '';
    return path.charAt(0) === '/' ? path : '/' + path;
  });

  /**
   * @ngdoc method
   * @name $location#search
   *
   * @description
   * This method is getter / setter.
   *
   * Return search part (as object) of current URL when called without any parameter.
   *
   * Change search part when called with parameter and return `$location`.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo
   * let searchObject = $location.search();
   * // => {foo: 'bar', baz: 'xoxo'}
   *
   * // set foo to 'yipee'
   * $location.search('foo', 'yipee');
   * // $location.search() => {foo: 'yipee', baz: 'xoxo'}
   * ```
   *
   * @param {string|Object.<string>|Object.<Array.<string>>} search New search params - string or
   * hash object.
   *
   * When called with a single argument the method acts as a setter, setting the `search` component
   * of `$location` to the specified value.
   *
   * If the argument is a hash object containing an array of values, these values will be encoded
   * as duplicate search parameters in the URL.
   *
   * @param {(string|Number|Array<string>|boolean)=} paramValue If `search` is a string or number, then `paramValue`
   * will override only a single search property.
   *
   * If `paramValue` is an array, it will override the property of the `search` component of
   * `$location` specified via the first argument.
   *
   * If `paramValue` is `null`, the property specified via the first argument will be deleted.
   *
   * If `paramValue` is `true`, the property specified via the first argument will be added with no
   * value nor trailing equal sign.
   *
   * @return {Object} If called with no arguments returns the parsed `search` object. If called with
   * one or more arguments returns `$location` object itself.
   */
  search = function(search, paramValue) {
    switch (arguments.length) {
      case 0:
        return this.$$search;
      case 1:
        if (isString(search) || isNumber(search)) {
          search = search.toString();
          this.$$search = parseKeyValue(search);
        } else if (isObject(search)) {
          search = { ...search };
          // remove object undefined or null properties
          forEach(search, function(value, key) {
            if (value == null) delete search[key];
          });

          this.$$search = search;
        } else {
          throw Error(
            'isrcharg',
            'The first argument of the `$location#search()` call must be a string or an object.',
          );
        }
        break;
      default:
        if (isNil(paramValue) || paramValue === null) {
          delete this.$$search[search];
        } else {
          this.$$search[search] = paramValue;
        }
    }

    this.$$compose();
    return this;
  };

  /**
   * @ngdoc method
   * @name $location#hash
   *
   * @description
   * This method is getter / setter.
   *
   * Returns the hash fragment when called without any parameters.
   *
   * Changes the hash fragment when called with a parameter and returns `$location`.
   *
   *
   * ```js
   * // given URL http://example.com/#/some/path?foo=bar&baz=xoxo#hashValue
   * let hash = $location.hash();
   * // => "hashValue"
   * ```
   *
   * @param {(string|number)=} hash New hash fragment
   * @return {string} hash
   */
  hash = locationGetterSetter('$$hash', function(hash) {
    return hash !== null ? hash.toString() : '';
  });

  /**
   * @ngdoc method
   * @name $location#replace
   *
   * @description
   * If called, all changes to $location during the current `$digest` will replace the current history
   * record, instead of adding a new one.
   */
  replace = function() {
    this.$$replace = true;
    return this;
  };
}

/**
 * LocationHtml5Url represents a URL
 * This object is exposed as $location service when HTML5 mode is enabled and supported
 *
 * @constructor
 * @param {string} appBase application base URL
 * @param {string} appBaseNoFile application base URL stripped of any filename
 * @param {string} basePrefix URL path prefix
 */
class LocationHtml5Url extends Location {
  constructor(appBase, appBaseNoFile, basePrefix) {
    super(appBase, appBaseNoFile, basePrefix);
    this.$$html5 = true;
    parseAbsoluteUrl(this.appBase, this);
  }

  /**
   * Parse given HTML5 (regular) URL string into properties
   * @param {string} url HTML5 URL
   * @private
   */
  $$parse(url) {
    let pathUrl = stripBaseUrl(this.appBaseNoFile, url);
    if (!isString(pathUrl)) {
      throw Error(
        'ipthprfx',
        'Invalid url "{0}", missing path prefix "{1}".',
        url,
        this.appBaseNoFile,
      );
    }

    parseAppUrl(pathUrl, this, true);

    if (!this.$$path) {
      this.$$path = '/';
    }

    this.$$compose();
  }

  $$normalizeUrl(url) {
    return this.appBaseNoFile + url.substr(1); // first char is always '/'
  }

  $$parseLinkUrl(url, relHref) {
    if (relHref && relHref[0] === '#') {
      // special case for links to hash fragments:
      // keep the old url and only replace the hash fragment
      this.hash(relHref.slice(1));
      return true;
    }
    let appUrl, prevAppUrl;
    let rewrittenUrl;

    if (!isNil((appUrl = stripBaseUrl(this.appBase, url)))) {
      prevAppUrl = appUrl;
      if (this.basePrefix && !isNil((appUrl = stripBaseUrl(this.basePrefix, appUrl)))) {
        rewrittenUrl = this.appBaseNoFile + (stripBaseUrl('/', appUrl) || appUrl);
      } else {
        rewrittenUrl = this.appBase + prevAppUrl;
      }
    } else if (!isNil((appUrl = stripBaseUrl(this.appBaseNoFile, url)))) {
      rewrittenUrl = this.appBaseNoFile + appUrl;
    } else if (this.appBaseNoFile === url + '/') {
      rewrittenUrl = this.appBaseNoFile;
    }
    if (rewrittenUrl) {
      this.$$parse(rewrittenUrl);
    }
    return !!rewrittenUrl;
  }

  /**
   * @ngdoc method
   * @name $location#state
   *
   * @description
   * This method is getter / setter.
   *
   * Return the history state object when called without any parameter.
   *
   * Change the history state object when called with one parameter and return `$location`.
   * The state object is later passed to `pushState` or `replaceState`.
   *
   * NOTE: This method is supported only in HTML5 mode and only in browsers supporting
   * the HTML5 History API (i.e. methods `pushState` and `replaceState`). If you need to support
   * older browsers (like IE9 or Android < 4.0), don't use this method.
   *
   * @param {object=} state State object for pushState or replaceState
   * @return {object} state
   */
  state(state) {
    if (!arguments.length) {
      return this.$$state;
    }

    if (!this.$$html5) {
      throw Error(
        'nostate',
        'History API state support is available only ' +
          'in HTML5 mode and only in browsers supporting HTML5 History API',
      );
    }
    // The user might modify `stateObject` after invoking `$location.state(stateObject)`
    // but we're changing the $$state reference to $browser.state() during the $digest
    // so the modification window is narrow.
    this.$$state = isNil(state) ? null : state;
    this.$$urlUpdatedByLocation = true;

    return this;
  }
}

/**
 * LocationHashbangUrl represents URL
 * This object is exposed as $location service when developer doesn't opt into html5 mode.
 * It also serves as the base class for html5 mode fallback on legacy browsers.
 *
 * @constructor
 * @param {string} appBase application base URL
 * @param {string} appBaseNoFile application base URL stripped of any filename
 * @param {string} hashPrefix hashbang prefix
 */
class LocationHashbangUrl extends Location {
  constructor(appBase, appBaseNoFile, hashPrefix) {
    super(appBase, appBaseNoFile, hashPrefix);
    this.hashPrefix = hashPrefix;
    parseAbsoluteUrl(appBase, this);
  }

  /**
   * Parse given hashbang URL into properties
   * @param {string} url Hashbang URL
   * @private
   */
  $$parse(url) {
    let withoutBaseUrl = stripBaseUrl(this.appBase, url) || stripBaseUrl(this.appBaseNoFile, url);
    let withoutHashUrl;

    if (!isNil(withoutBaseUrl) && withoutBaseUrl.charAt(0) === '#') {
      // The rest of the URL starts with a hash so we have
      // got either a hashbang path or a plain hash fragment
      withoutHashUrl = stripBaseUrl(this.hashPrefix, withoutBaseUrl);
      if (isNil(withoutHashUrl)) {
        // There was no hashbang prefix so we just have a hash fragment
        withoutHashUrl = withoutBaseUrl;
      }
    } else {
      // There was no hashbang path nor hash fragment:
      // If we are in HTML5 mode we use what is left as the path;
      // Otherwise we ignore what is left
      if (this.$$html5) {
        withoutHashUrl = withoutBaseUrl;
      } else {
        withoutHashUrl = '';
        if (isNil(withoutBaseUrl)) {
          this.appBase = url;
          /** @type {?} */ (this).replace();
        }
      }
    }

    parseAppUrl(withoutHashUrl, this, false);

    this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, this.appBase);

    this.$$compose();

    /*
     * In Windows, on an anchor node on documents loaded from
     * the filesystem, the browser will return a pathname
     * prefixed with the drive name ('/C:/path') when a
     * pathname without a drive is set:
     *  * a.setAttribute('href', '/foo')
     *   * a.pathname === '/C:/foo' //true
     *
     * Inside of AngularJS, we're always using pathnames that
     * do not include drive names for routing.
     */
    function removeWindowsDriveName(path, url, base) {
      /*
      Matches paths for file protocol on windows,
      such as /C:/foo/bar, and captures only /foo/bar.
      */
      let windowsFilePathExp = /^\/[A-Z]:(\/.*)/;

      let firstPathSegmentMatch;

      //Get the relative path from the input URL.
      if (startsWith(url, base)) {
        url = url.replace(base, '');
      }

      // The input URL intentionally contains a first path segment that ends with a colon.
      if (windowsFilePathExp.exec(url)) {
        return path;
      }

      firstPathSegmentMatch = windowsFilePathExp.exec(path);
      return firstPathSegmentMatch ? firstPathSegmentMatch[1] : path;
    }
  }

  $$normalizeUrl(url) {
    return this.appBase + (url ? this.hashPrefix + url : '');
  }

  $$parseLinkUrl(url, relHref) {
    if (Url.stripHash(this.appBase) === Url.stripHash(url)) {
      this.$$parse(url);
      return true;
    }
    return false;
  }

  /**
   * @ngdoc method
   * @name $location#state
   *
   * @description
   * This method is getter / setter.
   *
   * Return the history state object when called without any parameter.
   *
   * Change the history state object when called with one parameter and return `$location`.
   * The state object is later passed to `pushState` or `replaceState`.
   *
   * NOTE: This method is supported only in HTML5 mode and only in browsers supporting
   * the HTML5 History API (i.e. methods `pushState` and `replaceState`). If you need to support
   * older browsers (like IE9 or Android < 4.0), don't use this method.
   *
   * @param {object=} state State object for pushState or replaceState
   * @return {object} state
   */
  state(state) {
    if (!arguments.length) {
      return this.$$state;
    }

    throw Error(
      'nostate',
      'History API state support is available only ' +
        'in HTML5 mode and only in browsers supporting HTML5 History API',
    );
  }
}

/**
 * LocationHashbangUrl represents URL
 * This object is exposed as $location service when html5 history api is enabled but the browser
 * does not support it.
 *
 * @constructor
 * @param {string} appBase application base URL
 * @param {string} appBaseNoFile application base URL stripped of any filename
 * @param {string} hashPrefix hashbang prefix
 */
class LocationHashbangInHtml5Url extends LocationHashbangUrl {
  constructor(appBase, appBaseNoFile, hashPrefix) {
    super(appBase, appBaseNoFile, hashPrefix);
    this.$$html5 = true;
  }

  $$parseLinkUrl(url, relHref) {
    if (relHref && relHref[0] === '#') {
      // special case for links to hash fragments:
      // keep the old url and only replace the hash fragment
      this.hash(relHref.slice(1));
      return true;
    }

    let rewrittenUrl;
    let appUrl;

    if (this.appBase === Url.stripHash(url)) {
      rewrittenUrl = url;
    } else if ((appUrl = stripBaseUrl(this.appBaseNoFile, url))) {
      rewrittenUrl = this.appBase + this.hashPrefix + appUrl;
    } else if (this.appBaseNoFile === url + '/') {
      rewrittenUrl = this.appBaseNoFile;
    }
    if (rewrittenUrl) {
      this.$$parse(rewrittenUrl);
    }
    return !!rewrittenUrl;
  }

  $$normalizeUrl(url) {
    // include hashPrefix in $$absUrl when $$url is empty so IE9 does not reload page because of removal of '#'
    return this.appBase + this.hashPrefix + url;
  }

  /**
   * @ngdoc method
   * @name $location#state
   *
   * @description
   * This method is getter / setter.
   *
   * Return the history state object when called without any parameter.
   *
   * Change the history state object when called with one parameter and return `$location`.
   * The state object is later passed to `pushState` or `replaceState`.
   *
   * NOTE: This method is supported only in HTML5 mode and only in browsers supporting
   * the HTML5 History API (i.e. methods `pushState` and `replaceState`). If you need to support
   * older browsers (like IE9 or Android < 4.0), don't use this method.
   *
   * @param {object=} state State object for pushState or replaceState
   * @return {object} state
   */
  state(state) {
    if (!arguments.length) {
      return this.$$state;
    }

    throw Error(
      'nostate',
      'History API state support is available only ' +
        'in HTML5 mode and only in browsers supporting HTML5 History API',
    );
  }
}

class LocationManager {
  static getLocation() {
    let LocationMode,
      initialUrl = (global || window).location.href,
      baseHref = Url.baseHref(initialUrl),
      appBase;

    if (config.html5Mode) {
      appBase = Url.serverBase(initialUrl) + (baseHref || '/');
      LocationMode = true ? LocationHtml5Url : LocationHashbangInHtml5Url;
    } else {
      appBase = Url.stripHash(initialUrl);
      LocationMode = LocationHashbangUrl;
    }
    var appBaseNoFile = Url.stripFile(appBase);

    return new LocationMode(appBase, appBaseNoFile, '#' + config.hashPrefix);
  }
}

export default LocationManager;
export { LocationHtml5Url, LocationHashbangUrl, LocationHashbangInHtml5Url };
