import {GET_USERINFO} from '../actionTypes';

export function getUserInfo(userInfo) {
    return {
        type: GET_USERINFO,
        payload: userInfo
    }
}

