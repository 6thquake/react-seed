import { PAGE_LOAD } from '../actionTypes';

export function pageLoad(load) {
  console.log('=====', load);
  return {
    type: PAGE_LOAD,
    payload: load,
  };
}
