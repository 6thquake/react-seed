import { PAGE_LOAD } from '../types';

export default function(state = false, action) {
  switch (action.type) {
    case PAGE_LOAD:
      return action.payload;
    default:
      return state;
  }
}
