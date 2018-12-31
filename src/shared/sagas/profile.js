import _ from 'lodash';
import { put, call, fork, race, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { succeededRequestPattern, failedRequestPattern } from '../utils/request';

import { request, accessTokenSelect } from './request';

import {
    checkProfileInfo,
    setProfile,
    uploadPhoto,
    uploadInProgress,
    setAvatarUrl,
} from '../actions/profile';

export function* handleLoadProfileSucceeded(url) {
    const action = yield take(succeededRequestPattern(url));
    const userData = _.get(action, 'payload.response.data');

    yield put(setProfile(userData));
}

export function* handleLoadProfileFailed(url) {
    yield take(failedRequestPattern(url));
    yield put(replace('/logout'));
}

export function* checkProfile() {
    const url = '/user/me?extra=history,preferences';

    yield fork(request, url);
    yield race({
        success: call(handleLoadProfileSucceeded, url),
        fail: call(handleLoadProfileFailed, url),
    });
}

export function* uploadPic({ payload }) {
    const token = yield accessTokenSelect();

    const formData = new FormData();
    formData.append('file', payload);

    yield put(uploadInProgress({ status: true, errorMsg: false }));
    const response = yield call(fetch, `${BASE_API}/file/avatar`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const data = yield call(() => response.json());

    if (response.status !== 200) {
        const errorMsg = data.errorMsg ? data.errorMsg : 'Something went wrong! Please try again.';
        yield put(uploadInProgress({ status: false, errorMsg: errorMsg }));
    } else {
        yield put(uploadInProgress({ status: false, errorMsg: false }));
        yield put(setAvatarUrl({ fileId: data.fileId }));
    }
}

export default function* profileSaga() {
    yield takeEvery(String(checkProfileInfo), checkProfile);
    yield takeLatest(String(uploadPhoto), uploadPic);
}
