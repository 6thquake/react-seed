import { GET_USERINFO } from '../types';

export function getUserInfo(userInfo) {
  return {
    type: GET_USERINFO,
    payload: userInfo,
  };
}
