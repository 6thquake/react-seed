import { PAGE_LOADED } from '../types';

export function pageLoaded(load) {
  return {
    type: PAGE_LOADED,
    payload: load,
  };
}
