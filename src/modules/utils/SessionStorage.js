import Storage from './Storage';

class SessionStorage extends Storage {
  storage = sessionStorage;

  static getInstance() {
    let instance = SessionStorage.instance;
    if (!instance) {
      instance = new SessionStorage();
    }
    return instance;
  }
}

export default new SessionStorage();
