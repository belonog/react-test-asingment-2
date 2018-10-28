import { REQUEST_TASKS, RECEIVE_TASKS, SET_TASKS_SORT } from 'actions/tasks';

const initalState = {
    items: null,
    isFetching: false,
    lastUpdate: null,
    didInvalidate: false,
    sort: null,
    pagination: {
        page: 1,
    },
    error: null,
};

const tasksReducer = (state = initalState, action) => {
    switch (action.type) {
        case REQUEST_TASKS:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_TASKS:
            const newState = {
                isFetching: false,
                didInvalidate: false,
                lastUpdate: Date.now(),
                pagination: {
                    ...state.pagination,
                    page: action.payload.page
                },
            };

            if (action.payload.status =! 'ok') {
                return {
                    ...state,
                    ...newState,
                    error: action.payload.message,
                    items: null,
                };
            }

            return {
                ...state,
                ...newState,
                error: null,
                items: action.payload.message.tasks,
                pagination: {
                    ...newState.pagination,
                    total: Math.floor(action.payload.message.total_task_count / 3)
                },
            };
        case SET_TASKS_SORT:
            const newSort = {
                sort_field: action.payload,
                sort_direction:
                    state.sort && state.sort.sort_field === action.payload && state.sort.sort_direction === 'asc'
                    ? 'desc'
                    : 'asc'
            };

            return {
                ...state,
                sort: {
                    ...newSort
                },
            };

        default:
            return state;
    }
};

export default tasksReducer;
