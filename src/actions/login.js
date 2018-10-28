export const SET_LOGGED_CUSTOMER = 'SET_LOGGED_CUSTOMER';
export const CLEAR_LOGGED_CUSTOMER = 'CLEAR_LOGGED_CUSTOMER';
export const CUSTOMER_LOGIN_PENDING = 'CUSTOMER_LOGIN_PENDING';

export function setLoggedCustomer(customer) {
    return {
        type: SET_LOGGED_CUSTOMER,
        payload: customer
    };
}

export function logoutCustomer() {
    return {
        type: CLEAR_LOGGED_CUSTOMER,
    };
}

export function customerLoginPending() {
    return {
        type: CUSTOMER_LOGIN_PENDING
    };
}
