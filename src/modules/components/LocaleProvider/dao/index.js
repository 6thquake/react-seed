import urls from './urls';
import BaseDao from '$core/BaseDao';

class List extends BaseDao {
  constructor(config) {
    super(config)
  }

  queryResourceI18n(data) {
    let config = {
      url: urls.locale,
      data
    };
    return this.sendPost(config);
  }
}

export default new List();