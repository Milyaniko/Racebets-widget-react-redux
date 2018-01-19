import { RACE_SELECTED } from "../utils/ActionTypes";

const selectRace = (race) => {
    return {
        type: RACE_SELECTED,
        payload: race
    }
};

export default selectRace;