import Routes from './Routes';

export default {
  name: 'react-seed',

  navBar: 'vertical', // horizontal, none

  appBar: true,

  loglevel: 'info',

  theme: 'default',

  locale: 'zh',

  google: {
    id: 'UA-106598593-2',
  },

  html5Mode: false,
  hashPrefix: '',

  routes: Routes,

  api: '/api/v1',
  websocket: 'ws://localhost:8080/websocket',

  contentType: 'application/json;charset=UTF-8',
};
