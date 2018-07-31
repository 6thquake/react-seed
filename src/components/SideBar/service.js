import BaseDao from '../../core/BaseDao';
import { domains } from "../../config/domain";

class MenuService extends BaseDao {
    constructor(config) {
        super(config)
    }
    getMenu() {
        return this.sendPost({
            url: domains.common + 'getLoginUserMenuAuth',
            data: {}
        });
    }
}
export default new MenuService();