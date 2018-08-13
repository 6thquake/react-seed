import NohupWebSocket from '@6thquake/inohupwebsocket';
import StateManager from '$core/state/StateManager';
import config from '$config';
const stateManager = StateManager.getInstance();

const { protocol, host, hostname, port } = (global || window || {}).location;

let wProtocol = 'ws:';
if (protocol === 'https:') {
  wProtocol = 'wss:';
}

const ws = NohupWebSocket.getInstance(`${wProtocol}//${host}${config.websocket}`);
ws.onopen = () => {
  ws.send({
    url: 'whoami',
    user: stateManager.getProperty('userIP') || '',
    namespace: 'react-seed',
  }).progress(data => {
    stateManager.setProperties('local', {
      userIp: data.data.user,
    });
  });
};

export default ws;
