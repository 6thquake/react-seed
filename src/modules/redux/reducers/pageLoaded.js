import { PAGE_LOADED } from '../types';

export default function(state = false, action) {
  switch (action.type) {
    case PAGE_LOADED:
      return action.payload;
    default:
      return state;
  }
}
