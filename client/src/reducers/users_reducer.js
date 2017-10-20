import types from '../actions/types';

const DEFAULT_STATE = {auth: null};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        //the object we get back from the server looks exactly the same for both signin and signup, so we can use the same reducer
        case types.SIGNIN:
        case types.SIGNUP:
            return {
                auth: {
                    username: action.payload.username,
                    color: action.payload.color
                }
            };
        case types.SIGNOUT:
            return {
                auth: null
            };
        default:
            return state;
    }
}