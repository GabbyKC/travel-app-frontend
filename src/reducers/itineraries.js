import {FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_FAILURE} from '../constants/action-types';

export const initialState = {
    itineraries: [],
    isLoading: false,
};

export function reducer(state = initialState, action) {
    if (action.type === FETCH_ITINERARIES_REQUEST) {
        return {...state, isLoading: true}
    }
    if (action.type === FETCH_ITINERARIES_SUCCESS) {
        return {...state, isLoading: false, itineraries: action.payload}
    }
    if (action.type === FETCH_ITINERARIES_FAILURE) {
        return {...state, isLoading: false, itineraries: null}
    }
    return state;
}