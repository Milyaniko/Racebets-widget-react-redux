import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from "../../app/utils/ActionTypes";
import raceData from '../../app/reducers/RaceDataReducer';

describe('Request Reducer', () => {
    it('has an initial state', () => {
        expect(raceData(undefined, { type: 'unexpected' })).toEqual({
            isFetching: null,
            data: [],
            hasError: false,
            errorMessage: null
        });
    });
    it('can handle FETCH_DATA', () => {
        expect(raceData(undefined, { 
            type: FETCH_DATA,
            payload: false
        })).toEqual({
            isFetching: true,
            data: null,
            hasError: false,
            errorMessage: null
        });
    });
    it('can handle FETCH_DATA_SUCCESS', () => {
        expect(raceData(undefined, { 
            type: FETCH_DATA_SUCCESS,
            payload : true
        })).toEqual({
            isFetching: false,
            data: true,
            hasError: false,
            errorMessage: null
        });
    });
    it('can handle FETCH_DATA_ERROR', () => {
        expect(raceData(undefined, {
             type: FETCH_DATA_ERROR,
             payload: true
            })).toEqual({
            isFetching: false,
            data: null,
            hasError: true,
            errorMessage: true
        });
    });
});
