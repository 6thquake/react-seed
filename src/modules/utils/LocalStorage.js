import Storage from './Storage';

export default class LocalStorage extends Storage {
  storage = localStorage;

  static getInstance() {
    let instance = LocalStorage.instance;
    if (!instance) {
      instance = new LocalStorage();
    }
    return instance;
  }
}
