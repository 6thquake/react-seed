import Observable from './Observable';

/**
 * @class MessageQueue
 * @constructor 消息队列
 */
class MessageQueue extends Observable {
  constructor() {
    super();
    this.queen = [];
  }

  static maxSize = 100;

  /**
   * @example Object {type:'INFO',content:'这是一段提示'}
   * @param e
   * @returns {MessageQueue}
   */
  add(e) {
    const len = this.queen.length;
    if (len > MessageQueue.maxSize) {
      this.queen.shift();
    }
    this.queen.push(e);
    return this;
  }

  /**
   *
   * @param e
   * @constructor 添加后立即触发
   */
  addAndNotify(e) {
    this.add(e);
    this.notifyObservers();
  }

  remove(e) {
    const index = this.queen.findIndex(q => q === e);
    if (index > -1) {
      this.queen.splice(index, 1);
    }
    return this;
  }

  poll() {
    return this.queen.length ? this.queen.shift() : null;
  }

  contains(e) {
    return this.queen.includes(e);
  }

  isEmpty() {
    return this.queen.length === 0;
  }
}

export default new MessageQueue();
