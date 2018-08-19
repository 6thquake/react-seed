import { ROUTES_UPDATED } from '../types';

export function routesUpdated(changed) {
  return {
    type: ROUTES_UPDATED,
    payload: changed,
  };
}
