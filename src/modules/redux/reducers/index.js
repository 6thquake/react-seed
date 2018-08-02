import {combineReducers} from 'redux';
import menuOpen from './menuOpen';
import userInfo from './userInfo';
import pageLoad from './pageLoad';

export default combineReducers({
    menuOpen,
    userInfo,
    pageLoad
});