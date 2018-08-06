import { PAGE_LOAD } from '../types';

export function pageLoad(load) {
  return {
    type: PAGE_LOAD,
    payload: load,
  };
}
