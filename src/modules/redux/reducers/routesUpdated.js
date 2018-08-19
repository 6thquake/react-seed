import { ROUTES_UPDATED } from '../types';

export default function(state = new Date(), action) {
  switch (action.type) {
    case ROUTES_UPDATED:
      return action.payload;
    default:
      return state;
  }
}
