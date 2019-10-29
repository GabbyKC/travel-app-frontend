import {FETCH_CITIES_SUCCESS, FETCH_CITIES_REQUEST, FETCH_CITIES_FAILURE, FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_FAILURE, CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS} from '../constants/action-types';

export function getCities() {
    return function (dispatch) {
        dispatch({type: FETCH_CITIES_REQUEST});

        return fetch('http://192.168.0.110:5000/cities/all')
            .then(response => response.json())
            .then(json => {
                console.log('payload', json);
                dispatch({type: FETCH_CITIES_SUCCESS, payload: json});
            })
            .catch(e => dispatch({type: FETCH_CITIES_FAILURE}));

    };
}

export function getItineraries(cityId) {
    return function (dispatch) {
        dispatch({type: FETCH_ITINERARIES_REQUEST});

        return fetch(`http://192.168.0.110:5000/cities/${cityId}/itineraries`)
            .then(response => response.json())
            .then(json => {
                dispatch({type: FETCH_ITINERARIES_SUCCESS, payload: json});
            })
            .catch(e => dispatch({type: FETCH_ITINERARIES_FAILURE}))
    };
}

export function createAccount(data) {
    return function (dispatch) {
        dispatch({type: CREATE_USER_REQUEST});

        return fetch('http://192.168.0.110:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                dispatch({type: CREATE_USER_SUCCESS, payload: json});
            })
            .catch(e => dispatch({type: CREATE_USER_FAILURE}));
    };
}
