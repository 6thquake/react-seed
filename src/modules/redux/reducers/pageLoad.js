import {PAGE_LOAD} from "../actionTypes";

export default function (state = false, action) {
    console.log('actions', action)
    switch (action.type) {
        case PAGE_LOAD:
            return action.payload;
        default:
            return state;
    }
}