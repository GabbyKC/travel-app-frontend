import {
    CREATE_USER_SUCCESS,
    CREATE_USER_REQUEST,
    CREATE_USER_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT_REQUEST
} from '../constants/action-types';

export const initialState = {
    isLoading: false,
    userCreated: false,
    loggedInUser: null,
    errorMessages: [],
};

export function reducer(state = initialState, action) {
    if (action.type === CREATE_USER_REQUEST) {
        return {...state, isLoading: true, userCreated: false}
    }
    if (action.type === CREATE_USER_SUCCESS) {
        return {...state, isLoading: false, userCreated: true}
    }
    if (action.type === CREATE_USER_FAILURE) {
        if (action.payload) {
            let errors = action.payload.map(err => {
                return err.msg;
            });
            return {...state, isLoading: false, userCreated: false, errorMessages: errors}
        }
        return {...state, isLoading: false, userCreated: false}
    }
    if (action.type === USER_LOGIN_REQUEST) {
        return {...state, isLoading: true}
    }
    if (action.type === USER_LOGIN_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            loggedInUser: {token: action.payload.token, username: action.payload.userName, favoriteItineraries: action.payload.favoriteItineraries }
        }
    }
    if (action.type === USER_LOGIN_FAILURE) {
        if (action.payload) {
            let errors = action.payload.map(err => {
                return err.msg;
            });
            return {...state, isLoading: false, errorMessages: errors}
        }
        return {...state, isLoading: false}
    }
    if (action.type === USER_LOGOUT_REQUEST) {
        return {...state, loggedInUser: null}
    }
    return state;
}