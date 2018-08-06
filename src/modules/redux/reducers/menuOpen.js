import { MENU_OPEN } from '../types';

export default function(state = true, action) {
  switch (action.type) {
    case MENU_OPEN:
      return action.payload;
    default:
      return state;
  }
}
