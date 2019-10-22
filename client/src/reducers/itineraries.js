import { FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_FAILURE } from '../constants/action-types';

export const initialState = {
    itineraries: [],
    cityName: '',
    isLoading: false,
};

export function reducer(state = initialState, action) {
    if (action.type === FETCH_ITINERARIES_REQUEST) {
        return {...state, isLoading: true}
    }
    if (action.type === FETCH_ITINERARIES_SUCCESS) {
        return {...state, itineraries: action.payload.itineraries, cityName: action.payload.name, isLoading: false}
    }
    if (action.type === FETCH_ITINERARIES_FAILURE) {
        return {...state, isLoading: false, cityName: null, itineraries: null}
    }
    return state;
}