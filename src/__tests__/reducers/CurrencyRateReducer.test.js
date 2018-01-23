import { FETCH_CURRENCY, FETCH_CURRENCY_ERROR, FETCH_DATA_SUCCESS, FETCH_CURRENCY_SUCCESS } from "../../app/utils/ActionTypes";
import currencyRate from '../../app/reducers/CurrencyRateReducer';

describe('Request Reducer', () => {
    it('has an initial state', () => {
        expect(currencyRate(undefined, { type: 'unexpected' })).toEqual({
            isFetching: null,
            data: [],
            hasError: false,
            errorMessage: null
        });
    });
    it('can handle FETCH_CURRENCY', () => {
        expect(currencyRate(undefined, { 
            type: FETCH_CURRENCY,
            payload: false
        })).toEqual({
            isFetching: true,
            data: null,
            hasError: false,
            errorMessage: null
        });
    });
    it('can handle FETCH_CURRENCY_SUCCESS', () => {
        expect(currencyRate(undefined, { 
            type: FETCH_CURRENCY_SUCCESS,
            payload : true
        })).toEqual({
            isFetching: false,
            data: true,
            hasError: false,
            errorMessage: null
        });
    });
    it('can handle FETCH_CURRENCY_ERROR', () => {
        expect(currencyRate(undefined, {
             type: FETCH_CURRENCY_ERROR,
             payload: true
            })).toEqual({
            isFetching: false,
            data: null,
            hasError: true,
            errorMessage: true
        });
    });
});