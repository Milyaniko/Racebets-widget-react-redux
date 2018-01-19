import axios from 'axios';
import { FETCH_CURRENCY, FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_ERROR } from '../utils/ActionTypes';

const fetchCurrency = () => {
    return dispatch => {
        dispatch({ type: FETCH_CURRENCY })

        return axios.get('https://api.fixer.io/latest')
        .then((res) => {
            dispatch({ type: FETCH_CURRENCY_SUCCESS, payload: res.data.rates.GBP})
        })
        .catch((error) => {
            dispatch({ type: FETCH_CURRENCY_ERROR, payload: error})
        })
    }
};

export default fetchCurrency;