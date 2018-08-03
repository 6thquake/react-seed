import { PAGE_LOAD } from '../actionTypes';

export function pageLoad(load) {
  return {
    type: PAGE_LOAD,
    payload: load,
  };
}
