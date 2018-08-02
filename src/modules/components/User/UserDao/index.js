import BaseDao from '$core/dao/BaseDao';

class UserDao extends BaseDao {
  constructor(config) {
    super(config);
  }

  get() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export default new UserDao();
