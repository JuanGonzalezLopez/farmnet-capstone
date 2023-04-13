import {
    SET_TIME_FORMAT,
    SET_VIEW_FORMAT,
    SET_TEMP_UNIT
} from '../actions/outputSettingsActions'

export default function outputSettingsReducer (state = {}, { type, payload }) {

    let updates = {};
    switch(type){
        case SET_TIME_FORMAT:
            updates = {
                timeFormat: payload
            }
        break

        case SET_VIEW_FORMAT:
            updates = {
                viewFormat: payload
            }
        break

        case SET_TEMP_UNIT:
            updates = {
                tempUnit: payload
            }
        break

        default:
            return state;
    }
    return {
      ...state,
      ...updates
    };
}
