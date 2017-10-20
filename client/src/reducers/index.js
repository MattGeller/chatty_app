import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import user from './users_reducer';
import chat from './chat_reducer';

export default combineReducers({form, user, chat});