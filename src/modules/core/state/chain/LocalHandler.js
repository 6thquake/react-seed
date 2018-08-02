import LocalStorage from '$utils/LocalStorage';
import StorageHandler from './StorageHandler';

export default class LocalHandler extends StorageHandler {
  level = 3;
  levelName = 'local';

  constructor() {
    this.storage = LocalStorage;
  }
}
