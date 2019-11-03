import { CREATE_USER_SUCCESS, CREATE_USER_REQUEST, CREATE_USER_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE  } from '../constants/action-types';

export const initialState = {
    isLoading: false,
    userCreated: false,
    userToken: null,
};

export function reducer(state = initialState, action) {
    if (action.type === CREATE_USER_REQUEST) {
        return {...state, isLoading: true, userCreated: false}
    }
    if (action.type === CREATE_USER_SUCCESS) {
        return {...state, isLoading: false, userCreated: true}
    }
    if (action.type === CREATE_USER_FAILURE) {
        return {...state, isLoading: false, userCreated: false}
    }
    if (action.type === USER_LOGIN_REQUEST) {
        return {...state, isLoading: true }
    }
    if (action.type === USER_LOGIN_SUCCESS) {
        return {...state, isLoading: false, userToken: action.payload.token}
    }
    if (action.type === USER_LOGIN_FAILURE) {
        return {...state, isLoading: false}
    }

    return state;
}