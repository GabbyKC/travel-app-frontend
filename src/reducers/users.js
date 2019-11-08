import {
    CREATE_USER_SUCCESS,
    CREATE_USER_REQUEST,
    CREATE_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
    FAVORITE_ITINERARY_SUCCESS,
    FAVORITE_ITINERARY_FAILURE,
    UNFAVORITE_ITINERARY_SUCCESS,
    UNFAVORITE_ITINERARY_FAILURE,
    SET_USER_TOKEN,
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
    if (action.type === LOGIN_USER_REQUEST) {
        return {...state, isLoading: true}
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            loggedInUser: {token: action.payload.token, username: action.payload.username}
        }
    }
    if (action.type === SET_USER_TOKEN) {
        return {
            ...state,
            loggedInUser: {token: action.payload.token, username: action.payload.username}
        }
    }
    if (action.type === LOGIN_USER_FAILURE) {
        if (action.payload) {
            let errors = action.payload.map(err => {
                return err.msg;
            });
            return {...state, isLoading: false, errorMessages: errors}
        }
        return {...state, isLoading: false}
    }
    if (action.type === FETCH_USER_DATA_SUCCESS) {
        return {
            ...state,
            loggedInUser: {...state.loggedInUser, favoriteItineraries: action.payload.favoriteItineraries}
        }
    }
    if (action.type === FETCH_USER_DATA_FAILURE) {
        if (action.payload) {
            let errors = action.payload.map(err => {
                return err.msg;
            });
            return {...state, errorMessages: errors}
        }
    }
    if (action.type === FAVORITE_ITINERARY_SUCCESS) {
        return {
            ...state,
            loggedInUser: {...state.loggedInUser, favoriteItineraries: action.payload.favoriteItineraries}
        }
    }
    if (action.type === FAVORITE_ITINERARY_FAILURE) {
        if (action.payload) {
            let errors = action.payload.map(err => {
                return err.msg;
            });
            return {...state, errorMessages: errors}
        }
    }
    if (action.type === UNFAVORITE_ITINERARY_SUCCESS) {
        return {
            ...state,
            loggedInUser: {...state.loggedInUser, favoriteItineraries: action.payload.favoriteItineraries}
        }
    }
    if (action.type === UNFAVORITE_ITINERARY_FAILURE) {
        if (action.payload) {
            let errors = action.payload.map(err => {
                return err.msg;
            });
            return {...state, errorMessages: errors}
        }
    }
    if (action.type === LOGOUT_USER_REQUEST) {
        return {...state, loggedInUser: null}
    }
    return state;
}