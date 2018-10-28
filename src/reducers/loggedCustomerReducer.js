import { SET_LOGGED_CUSTOMER, CUSTOMER_LOGIN_PENDING, CLEAR_LOGGED_CUSTOMER } from '../actions/login';

const initialState = {
    pending: false,
    logged: false
};

const loggedCustomerReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_LOGGED_CUSTOMER:

            return {
                ...state,
                logged: true,
                pending: false,
                customer: {
                    ...action.payload,
                },
            };
        case CUSTOMER_LOGIN_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLEAR_LOGGED_CUSTOMER:
            return {
                ...state,
                logged: false,
                customer: null,
                pending: false
            };

            default:
            return state;
    }
};

export default loggedCustomerReducer;
