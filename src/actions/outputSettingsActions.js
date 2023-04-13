export const SET_TIME_FORMAT = 'outputSettings:setTimeFormat';
export const SET_VIEW_FORMAT = 'outputSettings:setViewFormat';
export const SET_TEMP_UNIT = 'outputSettings:setTempUnit';

export function setTimeFormat(time){
    return {
        type: SET_TIME_FORMAT,
        payload: time
    }
};

export function setViewFormat(view){
    return {
        type: SET_VIEW_FORMAT,
        payload: view
    }
};

export function setTempUnit(unit){
    return {
        type: SET_TEMP_UNIT,
        payload: unit
    }
};
