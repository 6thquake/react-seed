import {MENU_OPEN} from '../actionTypes';

export function operateMenuOpen(collapse) {
    return {
        type: MENU_OPEN,
        payload: collapse
    }
}

