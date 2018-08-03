import config from '$config';

const loglevels = ['debug', 'info', 'warn', 'error', 'fatal'];

export default class Logger {
  debug(message) {}

  info(message) {}

  warn(message) {}

  error(message) {}

  fatal(message) {}

  isDebugEnabled() {
    let loglevel = config.loglevel;
    let index = loglevels.indexOf(loglevel);
    return index <= 0;
  }

  isInfoEnabled() {
    let loglevel = config.loglevels;
    let index = loglevels.indexOf(loglevel);
    return index <= 1;
  }

  isWarnEnabled() {
    let loglevel = config.loglevels;
    let index = loglevels.indexOf(loglevel);
    return index <= 2;
  }

  isErrorEnabled() {
    let loglevel = config.loglevels;
    let index = loglevels.indexOf(loglevel);
    return index <= 3;
  }

  isFatalEnabled() {
    let loglevel = config.loglevels;
    let index = loglevels.indexOf(loglevel);
    return index <= 4;
  }
}
