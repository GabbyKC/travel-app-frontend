import { CREATE_USER_SUCCESS, CREATE_USER_REQUEST, CREATE_USER_FAILURE } from '../constants/action-types';

export const initialState = {
    isLoading: false,
};

export function reducer(state = initialState, action) {
    if (action.type === CREATE_USER_REQUEST) {
        return {...state, isLoading: true}
    }
    if (action.type === CREATE_USER_SUCCESS) {
        return {...state, isLoading: false}
    }
    if (action.type === CREATE_USER_FAILURE) {
        return {...state, isLoading: false}
    }
    return state;
}