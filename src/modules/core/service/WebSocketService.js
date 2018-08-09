import NohupWebSocket from '@6thquake/inohupwebsocket';
import StateManager from '$core/state/StateManager';
import config from '$config';
const stateManager = StateManager.getInstance();

const ws = NohupWebSocket.getInstance(`${config.websocket}`);
ws.onopen = () => {
  ws.send({
    url: 'whoami',
    user: stateManager.getProperty('userIP') || '',
    namespace: 'noc',
  }).progress(data => {
    stateManager.setProperties('local', {
      userIp: data.data.user,
    });
  });
};

export default ws;
