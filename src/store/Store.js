import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from '../reducers/dataReducers'
import filtersReducer from '../reducers/filtersReducers'
import loadingReducer from '../reducers/loadingReducers'
import outputSettingsReducer from '../reducers/outputSettingsReducers'

import { INITIAL_STATE_STORE } from '../constants'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
    outputSetting: outputSettingsReducer,
    filters: filtersReducer,
    loading: loadingReducer,
    data: dataReducer,
})

const store = createStore(
    allReducers,
    INITIAL_STATE_STORE,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
