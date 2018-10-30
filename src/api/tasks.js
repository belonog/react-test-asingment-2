export const API_SERVER = 'https://uxcandy.com/~shapoval/test-task-backend';
export const API_SECRET = 'Name';

const tasks = {
    async get(page = 1, sort = {}) {
        return await get({
            path: '/',
            getParams: {
                developer: API_SECRET,
                page,
                ...sort,
            }
        });
    },

    async create(data) {
        return await get({
            path: '/create',
            method: 'POST',
            postData: data,
        });
    },

    async update(data, id) {
        return await get({
            path: '/edit/' + id,
            method: 'POST',
            postData: data,
        });
    },
};

export async function checkResponse(response) {

    return await response
        .then(res => {
            return res.json();
        }, err => ({
            code: 504,
            message: 'Server timeout'
        }))
        .catch(() => response)
        .then(res => {
            if (res instanceof Response === false) {
                return res;
            }

            return {
                status: 'error',
                message: res.statusText,
            };
        });
}

export async function get({ path, method = 'GET', postData, getParams }) {
    method = method.toUpperCase();
    const request = Object.assign({ method },
        method === 'POST' ? { body: postData } : {}
    );

    const requestPath = API_SERVER + path + `?developer=${API_SECRET}`
        + (getParams ? '&' + encodeURI(
            Object.entries(getParams)
                .map(itm => `${itm[0]}=${itm[1]}`)
                .join('&'))
        : '');

    let response = fetch(requestPath, request);

    return await checkResponse(response);
}


export default tasks;