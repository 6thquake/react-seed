import * as Raven from '@sentry/browser';
import { init } from '@sentry/browser';
import isString from 'lodash/isString';
import config from '$config';

init({
  dsn: config.dsn,
});

/**
 * @class RavenLogger
 * @extends {Logger}
 * @description
 * <p>
 * RavenLogger is the official browser JavaScript client for Sentry. It automatically reports uncaught JavaScript exceptions triggered from a browser environment, and provides a rich API for reporting your own errors.
 * </p>
 * <p><i>
 * Sentry provides open source error tracking that shows you every crash in your stack as it happens, with the details needed to prioritize, identify, reproduce, and fix each issue. It also gives you information your support team can use to reach out to and help those affected and tools that let users send you feedback for peace of mind.
 * </i></p>
 *
 * @author lico
 * @version 1.0.1
 * @since 0.0.1
 */
export default class RavenLogger extends Logger {
  constructor(name) {
    this.name = name;
  }

  /**
   * @function
   * @public
   * @summary Logs a message CharSequence with the DEBUG level.
   * @description Logs a message CharSequence with the DEBUG level.
   * @params {(String|Error)} message - the message object to log.
   */
  debug(message) {
    if (isString(message)) {
      Raven.captureMessage(message, {
        level: 'info',
        logger: this.name,
      });
    } else {
      Raven.captureError(message, {
        level: 'info',
        logger: this.name,
        extra: {
          trace: message instanceof Error ? message : '',
        },
      });
    }
    // System.out.debug(message);
  }

  /**
   * @function
   * @public
   * @summary Logs a message CharSequence with the INFO level.
   * @description Logs a message CharSequence with the INFO level.
   * @params {(String|Error)} message - the message object to log.
   */
  info(message) {
    if (isString(message)) {
      Raven.captureMessage(message, {
        level: 'info',
        logger: this.name,
      });
    } else {
      Raven.captureError(message, {
        level: 'info',
        logger: this.name,
        extra: {
          trace: message instanceof Error ? message : '',
        },
      });
    }
    // System.out.info(message);
  }

  /**
   * @function
   * @public
   * @summary Logs a message CharSequence with the WARN level.
   * @description Logs a message CharSequence with the WARN level.
   * @params {(String|Error)} message - the message object to log.
   */
  warn(message) {
    if (isString(message)) {
      Raven.captureMessage(message, {
        level: 'warning',
        logger: this.name,
      });
    } else {
      Raven.captureError(message, {
        level: 'warning',
        logger: this.name,
        extra: {
          trace: message instanceof Error ? message : '',
        },
      });
    }
    // System.out.warn(message);
  }

  /**
   * @function
   * @public
   * @summary Logs a message CharSequence with the ERROR level.
   * @description Logs a message CharSequence with the ERROR level.
   * @params {(String|Error)} message - the message object to log.
   */
  error(message) {
    if (isString(message)) {
      Raven.captureMessage(message, {
        level: 'error',
        logger: this.name,
      });
    } else {
      Raven.captureError(message, {
        level: 'error',
        logger: this.name,
        extra: {
          trace: message instanceof Error ? message : '',
        },
      });
    }
    // System.out.error(message);
  }

  /**
   * @function
   * @public
   * @summary Logs a message CharSequence with the FATAL level.
   * @description Logs a message CharSequence with the FATAL level.
   * @params {(String|Error)} message - the message object to log.
   */
  fatal(message) {
    this.error(message);
  }
}
