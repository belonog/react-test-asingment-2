import tasksApi from 'api/tasks';

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const SET_TASKS_SORT = 'SET_TASKS_SORT';

function requestTasks() {
    return {
        type: REQUEST_TASKS,
    };
}

function receiveTasks(page, data) {
    return {
        type: RECEIVE_TASKS,
        payload: {
            ...data,
            page
        }
    };
}

export function fetchTasks(page) {
    return async (dispatch, getState) => {
        dispatch(requestTasks());
        const {tasksState: {pagination, sort}} = getState();
        const requiredPage = typeof page != 'undefined' ? page : pagination.page;
        const result = await tasksApi.get(requiredPage, sort || {});

        dispatch(receiveTasks(requiredPage, result));
    };
}

function shouldFetch(state) {

    if (state.isFetching) {
        return false;
    } else if (!state.items) {
        return true;
    } else if (state.didInvalidate || state.lastUpdate < (Date.now() - 1000 * 60)) {
        return true;
    }

    return false;
}

export function updateIfNeeded() {
    return (dispatch, getState) => {
        const { tasksState } = getState();

        if (shouldFetch(tasksState)) {
            dispatch(fetchTasks());
        }
    };
}

function setTasksSort(fieldName) {
    return {
        type: SET_TASKS_SORT,
        payload: fieldName,
    };
}

export function sortTasks(fieldName) {
    return dispatch => {
        dispatch(setTasksSort(fieldName));
        dispatch(fetchTasks());
    }
}
