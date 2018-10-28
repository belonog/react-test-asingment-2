import { combineReducers } from 'redux';

import loggedCustomerState from './loggedCustomerReducer';
import tasksState from './tasksReducer';

const rootReducer = combineReducers({
    loggedCustomerState,
    tasksState,
});

export default rootReducer;
