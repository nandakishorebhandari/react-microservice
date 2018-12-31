/* @flow */
import { take, put, call, fork, race, takeEvery } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import formUrlencoded from 'form-urlencoded';

import { request } from './request';
import { loginSubmited, loggedIn } from '../actions/auth.js';
import {
    startRequestPattern,
    succeededRequestPattern,
    failedRequestPattern,
} from '../utils/request';
export const LOGIN_ERROR =
    "Sorry, that password isn't right.We can help you recover your password.";

export const CHANGE_PASSWORD_ERROR = 'We can`t change your password. Please check old password';

export function* handleLoginSuccess(url: string, method: string): Iterable<*> {
    const action: any = yield take(succeededRequestPattern(url, method));
    const {
        payload: { response },
    }: { payload: { response: Object } } = action;
    yield put(loggedIn(response));
}

export function* handleLoginFail(url: string, method: string): Iterable<*> {
    yield take(failedRequestPattern(url, method));
}

export function* submitLogin({
    payload: { email, password },
}: {
    payload: { email: string, password: string },
}): Iterable<*> {
    const method = 'POST';
    const url = '/auth/authenticate/insighter';
    yield fork(request, url, method, {
        body: formUrlencoded({
            grant_type: 'password',
            password: password,
            username: email.toLowerCase(),
        }),
    });

    yield take(startRequestPattern(url, method));

    yield race({
        success: call(handleLoginSuccess, url, method),
        fail: call(handleLoginFail, url, method),
    });
}

export default function* authSaga(): Iterable<*> {
    yield takeEvery(String(loginSubmited), submitLogin);
}
