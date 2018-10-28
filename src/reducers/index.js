import { combineReducers } from 'redux';

import loggedCustomerState from './loggedCustomerReducer';

const rootReducer = combineReducers({
    loggedCustomerState,
});

export default rootReducer;
