import types from '../actions/types';

const DEFAULT_STATE = {rooms: []};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_ROOM_LIST:
            return {rooms: action.payload};
        default:
            return state;
    }
}
//whatever gets returned from here is set to whatever is in combineReducers in the reducers index. In this case, chat. So chat, with an action of GET_ROOM_LIST will get chat.rooms set to action.payload (which is the response from the database)