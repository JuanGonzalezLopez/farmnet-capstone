import {
  getCows,
  getAllTemp,
  addCow,
  deleteCow as deleteCowService,
  deleteSteps,
  deleteTemp,
  editCow as editCowService,
} from "../api";

export const FETCH_COWS = "dataActions:fetchCows";
export const FETCH_COW_DATA = "dataActions:fetchCowData";
export const FETCH_COWS_SUCCESSULL = "dataActions:fetchCowsSuccessfull";
export const FETCH_COW_DATA_SUCCESSULL = "dataActions:fetchCowDataSuccessfull";
export const FETCH_COWS_ERROR = "dataActions:fetchCowsError";
export const SELECT_COWS = "dataActions:selectCow";
export const FETCH_ADD_COW = "dataActions:addCow";
export const FETCH_EDIT_COW = "dataActions:editCow";
export const ADD_COW_DATA_SUCCESSULL = "dataActions:addCowSuccess";
export const ADD_COW_ERROR = "dataActions:addCowError";
export const CLOSE_MODE = "dataActions:closeMode";
export const OPEN_MODE = "dataActions:openMode";
export const DELETE_COW = "dataActions:deleteCow";
export const DELETE_COW_SUCCESSULL = "dataActions:deleteCowSuccess";
export const EDIT_COW_DATA_SUCCESSULL = "dataActions:editCowSuccess";
export const DELETE_COW_ERROR = "dataActions:deleteCowError";
export const EDIT_COW_ERROR = "dataActions:editCowError";

export function fetchCows() {
  return async dispatch => {
    dispatch({
      type: FETCH_COWS
    });
    getCows()
      .then(res => {
        return dispatch({
          type: FETCH_COWS_SUCCESSULL,
          payload: res.data
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCH_COWS_ERROR,
          payload: err
        });
      });
  };
}

export function selectCow(cow) {
  return {
    type: SELECT_COWS,
    payload: cow
  };
}

export function getSelectedData(id) {
  return async dispatch => {
    dispatch({
      type: FETCH_COW_DATA
    });
    getAllTemp({ id: id })
      .then(res => {

        const nowTemp = new Date().valueOf();
        const data = [];

        for (var i = 0; i < 5000; i++) {
          data.push({
            id: 1234,
            timestamp: nowTemp - (1800000 * i),
            temperature: Math.random() * (373 - 273) + 273
          })
        }

        console.log(data);

        return dispatch({
          type: FETCH_COW_DATA_SUCCESSULL,
          payload: data.reverse()
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCH_COWS_ERROR,
          payload: err
        });
      });
  };
}

export function setCow(data) {
  return async dispatch => {
    dispatch({
      type: FETCH_ADD_COW
    });
    dispatch(closeMode());

    addCow(data)
      .then(res => {
        dispatch({
          type: ADD_COW_DATA_SUCCESSULL
        });
        dispatch(fetchCows());
      })
      .catch(err => {
        dispatch(selectCow(null));
        return dispatch({
          type: ADD_COW_ERROR,
          payload: err
        });
      });
  };
}

export function editCow(data) {
  return async dispatch => {
    dispatch({
      type: FETCH_EDIT_COW
    });
    dispatch(closeMode());
    dispatch(selectCow(null));

    editCowService(data)
      .then(res => {
        dispatch({
          type: EDIT_COW_DATA_SUCCESSULL
        });
        dispatch(fetchCows());
      })
      .catch(err => {
        return dispatch({
          type: EDIT_COW_ERROR,
          payload: err
        });
      });
  };
}

export function deleteCow(data) {
  return async dispatch => {
    dispatch(selectCow(null));
    dispatch({
      type: DELETE_COW
    });
    dispatch(closeMode());

    deleteSteps(data)
      .then(() => {
        deleteTemp(data).then(() => {
          deleteCowService(data).then(() => {
            dispatch({
              type: DELETE_COW_SUCCESSULL
            });
            dispatch(fetchCows());
          });
        });
      })
      .catch(err => {
        return dispatch({
          type: DELETE_COW_ERROR,
          payload: err
        });
      });
  };
}

export function openMode(mode) {
  return {
    type: OPEN_MODE,
    payload: mode
  };
}

export function closeMode() {
  return {
    type: CLOSE_MODE
  };
}
