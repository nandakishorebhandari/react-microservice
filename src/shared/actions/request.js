import { createAction } from 'redux-actions';

export const startRequest = createAction('START_REQUEST', (url, method = 'GET') => ({
    url,
    method,
}));

export const stopRequest = createAction('STOP_REQUEST', (url, method = 'GET') => ({ url, method }));

export const succeededRequest = createAction(
    'SUCCEEDED_REQUEST',
    (url, method = 'GET', response) => ({ url, method, response })
);

export const failedRequest = createAction(
    'FAILED_REQEUEST',
    (url, method = 'GET', statusCode, response) => ({
        url,
        method,
        statusCode,
        response,
    })
);
