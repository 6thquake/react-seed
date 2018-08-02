import Storage from './Storage';

class LocalStorage extends Storage {
  storage = localStorage;

  static getInstance() {
    let instance = LocalStorage.instance;
    if (!instance) {
      instance = new LocalStorage();
    }
    return instance;
  }
}

export default LocalStorage();
