// /* @flow */
// import 'isomorphic-fetch';
// import isBefore from 'date-fns/is_before';
// import { select, put, call, fork, take } from 'redux-saga/effects';
// import formUrlencoded from 'form-urlencoded';
// import Cookies from 'js-cookie';
// import { getFullUrl } from '../utils/request';
// import { updatedToken } from '../actions/auth';
// import { startRequest, stopRequest, succeededRequest, failedRequest } from '../actions/request';

// export function tokenDataSelect(state: any): any {
//     const authData = Cookies.getJSON('token');
//     return authData || null;
// }

// export function getAccessToken(state: any): any {
//     const authData = Cookies.getJSON('token');
//     return (authData && authData.access_token) || null;
// }

// export function* accessTokenSelect(): any {
//     // yield* obtainToken();
//     // const token = yield select(getAccessToken);
//     // return token;
// }

// export function* updateToken(refreshToken: string): Iterator<*> {
//     try {
//         const response: any = yield call(fetch, getFullUrl('/auth/authenticate/insighter'), {
//             method: 'POST',
//             cors: true,
//             headers: getHeaders(undefined, 'POST'),
//             body: formUrlencoded({
//                 grant_type: 'refresh_token',
//                 refresh_token: refreshToken,
//                 client_id: CLIENT_ID,
//                 client_secret: CLIENT_SECRET,
//                 scope: 'read write',
//             }),
//         });
//         const data = yield response.json();
//         yield put(updatedToken(data));
//     } catch (e) {
//         console.warn(e);
//         yield put(updatedToken(null));
//     }
// }

// /**
//  * Returns valid access token or null
//  */
// export function* obtainToken(): Iterator<*> {
//     const tokenData: any = yield select(tokenDataSelect);

//     if (!tokenData) {
//         return;
//     }

//     const {
//         refresh_token: refreshToken,
//         expire_date: expireDate,
//     }: {
//         access_token: string,
//         refresh_token: string,
//         expire_date: any,
//     } = tokenData;

//     if (expireDate && isBefore(new Date(), expireDate)) {
//         return;
//     }

//     if (!global.REFRESH_TOKEN_TASK) {
//         global.REFRESH_TOKEN_TASK = yield fork(updateToken, refreshToken);
//     }
//     yield take(String(updatedToken));
//     global.REFRESH_TOKEN_TASK = undefined;
// }

// export function getHeaders(
//     token: ?string,
//     method: string = 'GET',
//     contentType: string = 'application/x-www-form-urlencoded'
// ): any {
//     const headers: Object = {};
//     if (method === 'POST' || method === 'PUT') {
//         headers['Content-Type'] = contentType;
//     } else {
//         headers['Content-Type'] = 'application/json';
//     }
//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }
//     return headers;
// }

// /**
//  * Handle response default errors
//  */
// function* handleResponse(url: string, method: string, handleResponse: any): Iterator<*> {
//     const statusCode = handleResponse.status;

//     if (statusCode !== 200) {
//         let response;
//         try {
//             response = yield handleResponse.json();
//         } catch (e) {
//             response = undefined;
//         }
//         yield put(failedRequest(url, method, statusCode, response));
//     } else {
//         const response = yield handleResponse.json();
//         yield put(succeededRequest(url, method, response));
//     }
// }

// export function* request(url: string, method: string = 'GET', params: Object = {}): Iterator<*> {
//     yield put(startRequest(url, method));

//     const token = yield accessTokenSelect();
//     try {
//         const response = yield call(fetch, getFullUrl(url), {
//             method,
//             mode: 'cors',
//             headers: getHeaders(token, method, params.contentType),
//             ...params,
//         });
//         yield* handleResponse(url, method, response);
//         yield put(stopRequest(url, method));
//     } catch (e) {
//         console.warn('Request error', e);
//         yield put(stopRequest(url, method));
//     }
// }
