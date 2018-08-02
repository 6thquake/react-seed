import Storage from './Storage';

class SessionStorage extends Storage {
  storage = sessionStorage;
}

export default new SessionStorage();
