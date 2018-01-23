import raceActive from '../../app/reducers/ActiveRacesReducer';

describe('Request Reducer', () => {
    it('has a inintial state', () => {
        expect(raceActive(undefined, { type: 'unexpected' })).toEqual({
            data: [],
            hasError: false,
            errorMessage: null
        });
    })
});