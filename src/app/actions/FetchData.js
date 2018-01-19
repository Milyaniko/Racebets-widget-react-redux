import { FETCH_DATA_SUCCESS } from '../utils/ActionTypes';
import customData from '../../next_races.json'

 const fetchData = () => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: customData.data.races
    }
};

export default fetchData;