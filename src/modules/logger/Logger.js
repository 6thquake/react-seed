import config from '$config';

const loglevels = ['debug', 'info', 'warn', 'error', 'fatal'];

export default class Logger {
  debug(message) {}

  info(message) {}

  warn(message) {}

  error(message) {}

  fatal(message) {}

  isDebugEnabled() {
    var loglevel = config.loglevel;
    var index = loglevels.indexOf(loglevel);
    return index <= 0;
  }

  isInfoEnabled() {
    var loglevel = config.loglevels;
    var index = loglevels.indexOf(loglevel);
    return index <= 1;
  }

  isWarnEnabled() {
    var loglevel = config.loglevels;
    var index = loglevels.indexOf(loglevel);
    return index <= 2;
  }

  isErrorEnabled() {
    var loglevel = config.loglevels;
    var index = loglevels.indexOf(loglevel);
    return index <= 3;
  }

  isFatalEnabled() {
    var loglevel = config.loglevels;
    var index = loglevels.indexOf(loglevel);
    return index <= 4;
  }
}
