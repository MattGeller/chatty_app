import types from './types';
import axios from 'axios';

export function signup(userInfo){
    return dispatch => {
        axios.post('/auth/signup', userInfo).then(resp => {
            console.log('Resp from server:', resp);
            //send a token to the client to be stored in local storage
            localStorage.setItem('token', resp.data.token);

            dispatch({
                type: types.SIGNUP,
                payload: resp.data
            });
        });
    }
}

export function signin(userInfo){
    return dispatch => {
        axios.post('/auth/signin', userInfo).then(resp => {
            console.log('Signin Resp:', resp);

            localStorage.setItem('token', resp.data.token);

            dispatch({
                type: types.SIGNIN,
                payload: resp.data
            });
        });
    }
}