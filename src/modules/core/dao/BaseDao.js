import axios from 'axios';
import humps from 'humps';

import config from '$config';
import { messageQueue } from '../service/MessageService';
import LocaleProvider from '$components/LocaleProvider';

axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = config.contentType;

// axios 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      let { data = {}, status } = error.response;
      let { retMessage = '系统异常' } = data;
      if (data.detail) {
        messageQueue.addAndNotify({
          type: 'ERROR',
          content: data.detail,
        });
      } else if (status === 403) {
        messageQueue.addAndNotify({
          type: 'ERROR',
          content: '权限不足，请联系管理员！',
        });
      } else if (status === 404) {
        messageQueue.addAndNotify({
          type: 'ERROR',
          content: '接口找不到',
        });
      } else if (status === 500) {
        messageQueue.addAndNotify({
          type: 'ERROR',
          content: '系统异常',
        });
      } else {
        messageQueue.addAndNotify({
          type: 'ERROR',
          content: retMessage,
        });
      }
    } else if (error.request) {
      messageQueue.addAndNotify({
        type: 'ERROR',
        content: error.message || '网络异常，请联系管理员！',
      });
    } else {
      console.log(error.message);
    }

    return Promise.reject(error);
  },
);

class BaseDao {
  constructor(config) {
    this.config = config;
  }

  send(req) {
    let conf = Object.assign({}, req);
    try {
      if (conf.headers && !conf.headers.locale) {
        const locale = LocaleProvider.locale;
        Object.assign(conf.headers, { locale });
      }
    } catch (e) {
      console.error('Can not set locale to request header.');
    }

    if (conf.data) {
      if (conf.data instanceof FormData) {
        let data = new FormData();
        for (let pair of conf.data.entries()) {
          data.append(humps.decamelize(pair[0]), pair[1]);
        }
        config.data = data;
      } else {
        conf.data = humps.decamelizeKeys(conf.data);
      }
    }

    if (conf.params) {
      conf.params = humps.decamelizeKeys(conf.params);
    }

    return axios(conf).then(response => {
      response.data = humps.camelizeKeys(response.data);
      return response;
    });
  }

  sendGet(req = {}) {
    req.method = 'GET';

    return this.send({
      ...this.config,
      ...req,
    });
  }

  sendPost(req = {}) {
    req.method = 'POST';

    return this.send({
      ...this.config,
      ...req,
    });
  }

  sendPut(req = {}) {
    req.method = 'PUT';

    return this.send({
      ...this.config,
      ...req,
    });
  }

  sendPatch(req = {}) {
    req.method = 'PATCH';
    return this.send({
      ...this.config,
      ...req,
    });
  }

  sendDelete(req = {}) {
    req.method = 'DELETE';

    return this.send({
      ...this.config,
      ...req,
    });
  }

  get(id, headers = {}) {
    let { url } = this.config;
    let req = {
      method: 'GET',
      url: `${url}/${id}`,
      headers,
    };

    return this.send(req).then(data => {
      return data.data;
    });
  }

  save(data, headers = {}) {
    let { url } = this.config;
    let req = {
      method: 'POST',
      url,
      data,
      headers,
    };

    return this.send(req).then(data => {
      return data.data;
    });
  }

  update(data, headers = {}) {
    let id = data instanceof FormData ? data.get('id') : data.id;
    let { url } = this.config;
    let req = {
      method: 'PUT',
      url: `${url}/${id}`,
      data,
      headers,
    };

    return this.send(req).then(data => {
      return data.data;
    });
  }

  saveOrUpdate(data, headers = {}) {
    let id = data instanceof FormData ? data.get('id') : data.id;
    if (id) {
      return this.update(data, headers);
    }
    return this.save(data, headers);
  }

  query(params, headers = {}) {
    let { url } = this.config;
    let req = {
      method: 'GET',
      url,
      params,
      headers,
    };

    return this.send(req).then(data => {
      return data.data;
    });
  }

  remove(id, headers = {}) {
    let { url } = this.config;
    let req = {
      method: 'DELETE',
      url: `${url}/${id}`,
      headers,
    };

    return this.send(req).then(data => {
      return data.data;
    });
  }
}

export default BaseDao;
