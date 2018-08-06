import { MENU_OPEN } from '../types';

export function operateMenuOpen(collapse) {
  return {
    type: MENU_OPEN,
    payload: collapse,
  };
}
