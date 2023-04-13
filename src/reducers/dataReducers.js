import {
  FETCH_COWS,
  FETCH_COW_DATA,
  FETCH_COWS_SUCCESSULL,
  FETCH_COW_DATA_SUCCESSULL,
  FETCH_COWS_ERROR,
  SELECT_COWS,
  ADD_COW_ERROR,
  CLOSE_MODE,
  OPEN_MODE,
  DELETE_COW_ERROR,
  EDIT_COW_ERROR
} from "../actions/dataActions";

export default function langReducer(state = {}, { type, payload }) {
  let updates = {};
  switch (type) {
    case FETCH_COWS:
      updates = { cows: [] };
      break;

    case FETCH_COWS_SUCCESSULL:
      updates = { cows: payload };
      break;

    case SELECT_COWS:
      updates = { selected: payload };
      break;

    case FETCH_COWS_ERROR:
    case ADD_COW_ERROR:
    case DELETE_COW_ERROR:
    case EDIT_COW_ERROR:
      updates = { error: payload, selectedLoading: false };
      break;

    case FETCH_COW_DATA_SUCCESSULL:
      updates = { selectedData: payload, selectedLoading: false };
      break;

    case FETCH_COW_DATA:
      updates = { selectedData: [], selectedLoading: true };
      break;

    case CLOSE_MODE:
      updates = { mode: null };
      break;

    case OPEN_MODE:
      updates = { mode: payload };
      break;

    default:
      return state;
  }
  return { ...state, ...updates };
}
