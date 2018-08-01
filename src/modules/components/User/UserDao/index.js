import BaseDao from '$core/BaseDao';

class UserDao extends BaseDao {
    constructor(config) {
        super(config)
    }

    get() {
		return new Promise((resolve, reject) => {
			resolve();
		});
    }
}

export default new UserDao();