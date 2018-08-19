import { PAGE_LOADED } from '../types';

export function pageLoaded(loaded) {
  return {
    type: PAGE_LOADED,
    payload: loaded,
  };
}
