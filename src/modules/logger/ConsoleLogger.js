import Logger from './Logger';

export default class ConsoleLogger extends Logger {
  constructor(name) {
    this.name = name;
    this.out = console;
  }

  debug(message) {
    return this.out.debug(message);
  }

  info(message) {
    return this.out.info(message);
  }

  warn(message) {
    return this.out.warn(message);
  }

  error(message) {
    return this.out.error(message);
  }

  fatal(message) {
    return this.error(message);
  }
}
