import { FETCH_CITIES_SUCCESS, FETCH_CITIES_REQUEST, FETCH_CITIES_FAILURE } from '../constants/action-types';

export const initialState = {
    cities: [],
    isLoading: false,
};

export function reducer(state = initialState, action) {
    if (action.type === FETCH_CITIES_SUCCESS) {
        console.log('action', action);
        return { ...state, cities: action.payload, isLoading: false };
    }
    if (action.type === FETCH_CITIES_REQUEST) {
        return { ...state, isLoading: true };
    }
    if (action.type === FETCH_CITIES_FAILURE) {
        return { ...state, isLoading: false, cities: null };
    }
    return state;
}