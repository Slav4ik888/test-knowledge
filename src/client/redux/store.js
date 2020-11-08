import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import userReducer from './reducers/user-reducer';
import dataReducer from './reducers/data-reducer';
import uiReducer from './reducers/ui-reducer';

const logger = createLogger({
  collapsed: true,
});

const initialState = {};

const middleware = [thunk, logger];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
