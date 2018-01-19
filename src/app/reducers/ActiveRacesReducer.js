import { RACE_SELECTED } from "../utils/ActionTypes";

const initialState = {
    data: [],
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RACE_SELECTED:
            return Object.assign({}, state, {
                data: action.payload,
                hasError: false,
                errorMessage: null
            });

        default:
            return state;
    }
}