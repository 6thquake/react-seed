import {combineReducers} from 'redux';
import menuOpen from './menuOpen';
import userInfo from './userInfo';

export default combineReducers({
    menuOpen,
    userInfo
});