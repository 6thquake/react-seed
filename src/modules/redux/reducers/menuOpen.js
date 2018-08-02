import {MENU_OPEN} from "../actionTypes";
import { StepLabel } from "../../../../node_modules/@material-ui/core";

export default function (state = true, action) {
    switch (action.type) {
        case MENU_OPEN:
            return action.payload;
        default:
            return state;
    }
}