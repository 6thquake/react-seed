import SessionStorage from '$utils/SessionStorage';
import StorageHandler from './StorageHandler';

export default class SessionHandler extends StorageHandler {
  level = 2;
  levelName = 'session';

  constructor() {
    this.storage = SessionStorage;
  }
}
