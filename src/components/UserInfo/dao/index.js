import BaseDao from '../../../core/BaseDao';
import {domains} from "../../../config/domain";

class UserInfoDao extends BaseDao {
    constructor(config) {
        super(config)
    }

    getBasicInfo() {
        let config = {
            url: `${domains.common}/getBasicInfo`,
        };
        return this.sendGet(config);
    }
}

export default new UserInfoDao();