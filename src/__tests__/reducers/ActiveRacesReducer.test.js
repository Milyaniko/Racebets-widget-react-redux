import raceReducer from '../../app/reducers/ActiveRacesReducer';

describe('Request Reducer', () => {
    it('has a inintial state', () => {
        expect(raceReducer(undefined, { type: 'unexpected' })).toEqual({
            data: [],
            hasError: false,
            errorMessage: null
        });
    })
});