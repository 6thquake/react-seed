import Storage from './Storage';

export default class SessionStorage extends Storage {
  storage = sessionStorage;

  static getInstance() {
    let instance = SessionStorage.instance;
    if (!instance) {
      instance = new SessionStorage();
    }
    return instance;
  }
}

