import { FETCH_CURRENCY, FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_ERROR } from "../utils/ActionTypes";

const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case (FETCH_CURRENCY):
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            });

        case (FETCH_CURRENCY_SUCCESS):
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });

        case (FETCH_CURRENCY_ERROR):
            return Object.assign({}, state, {
                isFetching: false,
                data: null,
                hasError: true,
                errorMessage: action.payload
            });

        default:
            return state;
    }
} 