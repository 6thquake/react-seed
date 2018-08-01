import axios from 'axios';
import MQ from './MessageQueen';
import Lang from '$component/LocaleProvider';

axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// axios 拦截器
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error);
});


axios.interceptors.response.use((response) => {
    return response;
}, error => {
    if (error.response) {
        let {data = {}, status} = error.response;
        let {retMessage = '系统异常'} = data;

        if (status === 403) {
            MQ.addAndNotify({
                type: 'ERROR',
                content: '权限不足，请联系管理员！'
            });
        } else if (status === 404) {
            MQ.addAndNotify({
                type: 'ERROR',
                content: '接口找不到'
            });
        } else if (status === 500) {
            MQ.addAndNotify({
                type: 'ERROR',
                content: '系统异常'
            });
        } else {
            MQ.addAndNotify({
                type: 'ERROR',
                content: retMessage
            });
        }
    } else if (error.request) {
        MQ.addAndNotify({
            type: 'ERROR',
            content: error.message || '网络异常，请联系管理员！'
        });
    } else {
        console.log(error.message);
    }

    return Promise.reject(error);
});

class BaseDao {
    constructor(config) {
        this.config = config;
    }

    static checkCode(response) {
        let {data} = response;
        data = data || {};
        let {retMessage, retCode} = data;
        let code = Number(retCode);
        if ((code >= 200 && code < 300) || (code === 304)) {
            return response;
        }

        MQ.addAndNotify({
            type: 'ERROR',
            content: retMessage
        });
        return Promise.reject(retMessage);
    }

    /**
     * @private
     */
    static getLang() {
        let language = Lang.getFormatLang();
        switch (language) {
            case 'zh':
                language = 'zh_CN';
                break;
            case 'en':
                language = 'en_US';
                break;
            default:
                language = 'zh_CN';
                break;
        }

        return language;
    }

    // 核心方法
    send(config) {
        let conf = Object.assign({}, config);
        try {
            if (conf.data && !conf.data.head) {
                const locale = LocaleProvider.locale;
                Object.assign(conf.data, {head: {locale}})
            }
        } catch (e) {
            console.log('data格式异常！');
        }

        return axios(conf).then((response) => {
            return BaseDao.checkCode(response);
        });
    }

    sendGet(config = {}) {
        config.method = 'GET';

        return this.send(config);
    }

    sendPost(config = {}) {
        config.method = 'POST';

        return this.send(config);
    }

    sendPut(config = {}) {
        config.method = 'PUT';

        return this.send(config);
    }

    sendDelete(config = {}) {
        config.method = 'DELETE';

        return this.send(config);
    }

    get(params) {
        let {url} = this.config;
        let conf = {
            method: 'GET',
            url,
            params
        };

        return this.send(conf)
    }

    save(data) {
        let {url} = this.config;
        let conf = {
            method: 'POST',
            url,
            data
        };

        return this.send(conf)
    }

    saveOrUpdate(data) {
        if (data.id) {
            return this.update(data);
        }
        return this.save(data);
    }

    update(data) {
        let {url} = this.config;
        let conf = {
            method: 'PUT',
            url,
            data
        };

        return this.send(conf)
    }

    query(params) {
        let {url} = this.config;
        let conf = {
            method: 'GET',
            url,
            params
        };

        return this.send(conf)
    }

    remove(id) {
        let {url} = this.config;
        let conf = {
            method: 'DELETE',
            url: `${url}/${id}`
        };

        return this.send(conf)
    }
}

export default BaseDao;