import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

let middlewares = [];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    undefined, // Inital State
    applyMiddleware(...middlewares)
);

export default store;
