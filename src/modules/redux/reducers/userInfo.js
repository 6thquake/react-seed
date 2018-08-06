import { GET_USERINFO } from '../types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USERINFO:
      return action.payload;
    default:
      return state;
  }
}
