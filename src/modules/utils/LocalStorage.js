import Storage from './Storage';

class LocalStorage extends Storage {
    storage = localStorage;
}

export default new LocalStorage();