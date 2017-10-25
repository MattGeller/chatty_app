import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import user from './users_reducer';
import chat from './chat_reducer';

//combineReducers assembles the whole team of reducers. They all report to this, which will become the root reducer
export default combineReducers({form, user, chat});