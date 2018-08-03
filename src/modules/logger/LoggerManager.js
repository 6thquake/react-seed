import isString from 'lodash/isString';

import ConsoleLogger from './ConsoleLogger';
import RavenLogger from './RavenLogger';

let loggers = new Map();

/**
 * @class LoggerManager
 * @extends {Object}
 * @description
 * <p>
 * The anchor point for the Log4j logging system.
 * The most common usage of this class is to obtain a named Logger.
 * The method getLogger() is provided as the most convenient way to obtain a named Logger based on the calling class name.
 * This class also provides method for obtaining named Loggers.
 * </p>
 *
 * @author lico
 * @version 1.0.1
 * @since 0.0.1
 */
export default class LoggerManager {
  /**
   * @name LoggerManager.exists
   * @function
   * @public
   * @static
   * @summary Detects if a Logger with the specified name exists.
   * @description
   * <p>
   * Detects if a Logger with the specified name exists. This is a convenience method for porting from version 1.
   * </p>
   * @param {String} name - The Logger name to search for. <b>required</b>
   *
   * @return {Boolean} true if the Logger exists, false otherwise.
   */
  static exists(name) {
    return loggers.has(name);
  }

  /**
   * @name LoggerManager.getLogger
   * @function
   * @public
   * @static
   * @summary Returns a Logger with the name of the logger class or the specified name.
   * @description
   * <p>Returns a Logger with the name of the logger class or the specified name.</p>
   * @param {String|Class} name - The logger name or the logger class, if null it will default to "anonymous" logger.
   *
   * @return {Logger} The Logger.
   */
  static getLogger(name, type) {
    if (!name) {
      name = 'anonymous';
    } else if (!isString(name)) {
      throw new Error('the name is null or the calling class cannot be determined.');
    }

    let logger = loggers.get(name);

    if (!logger) {
      switch (type) {
        case 'raven':
          logger = new RavenLogger(name);
          break;
        default:
          logger = new ConsoleLogger(name);
          break;
      }

      loggers.set(name, logger);
    }

    return logger;
  }
}
