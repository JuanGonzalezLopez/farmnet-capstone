import {
    LOADING,
    NOT_LOADING
} from '../actions/loadingActions'
import {
    FETCH_COWS,
    FETCH_COWS_SUCCESSULL,
    DELETE_COW_ERROR,
    DELETE_COW,
    FETCH_ADD_COW,
    ADD_COW_ERROR,
    FETCH_EDIT_COW,
    EDIT_COW_ERROR,
    FETCH_COWS_ERROR
} from '../actions/dataActions'

export default function loadingReducer (state = false, { type, payload }) {

    switch(type){
        case LOADING:
        case FETCH_COWS:
        case DELETE_COW:
        case FETCH_ADD_COW:
        case FETCH_EDIT_COW:
            return true;

        case NOT_LOADING:
        case FETCH_COWS_SUCCESSULL:
        case DELETE_COW_ERROR:
        case ADD_COW_ERROR:
        case EDIT_COW_ERROR:
        case FETCH_COWS_ERROR:
            return false;

        default:
            return state;
    }
}
