import { combineReducers } from 'redux';
import menuOpen from './menuOpen';
import userInfo from './userInfo';
import pageLoaded from './pageLoaded';

export default combineReducers({
  menuOpen,
  userInfo,
  pageLoaded,
});
