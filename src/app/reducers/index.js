import { combineReducers } from 'redux';
import RaceDataReducer from './RaceDataReducer';
import CurrencyRateReducer from './CurrencyRateReducer';
import ActiveRacesReducer from './ActiveRacesReducer';
// Combines ou multiple reducers 
export default combineReducers({
   race: RaceDataReducer,
   currency: CurrencyRateReducer,
   activeRace: ActiveRacesReducer,
});

