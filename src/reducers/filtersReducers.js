import {
    SET_SORT,
    SET_CYCLE,
    SET_BREED,
    SET_FILTER
} from '../actions/filtersActions'

export default function filtersReducer (state = {}, { type, payload }) {

    let updates = {};
    switch(type){
        case SET_BREED:
            updates = {
                breed: payload
            };
            break;

        case SET_CYCLE:
            updates = {
                cycle: payload
            };
            break;

        case SET_SORT:
            updates = {
                sort: payload
            };
            break;

        case SET_FILTER:
            updates = {
                text: payload
            };
            break;

        default:
            return state;
    }
    return {...state, ...updates};
}
