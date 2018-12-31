import { createAction } from 'redux-actions';

export const setProfile = createAction('SET_PROFILE');
export const checkProfileInfo = createAction('CHECK_PROFILE_INFO');
export const setProfileFilled = createAction('SET_PROFILE_FILLED');
export const profileFullyFilled = createAction('PROFILE_FULLY_FILLED');
export const profileFillNeedy = createAction('PROFILE_FILL_NEEDY');
export const showNotification = createAction('SHOW_NOTIFICATION');

export const uploadPhoto = createAction('UPLOAD_PHOTO', (values) => values);

export const uploadInProgress = createAction('UPLOAD_PROGRESS', (values) => values);

export const setAvatarUrl = createAction('SET_AVATAR_URL', (values) => values);
