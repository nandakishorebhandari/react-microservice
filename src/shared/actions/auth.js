import { createAction } from 'redux-actions';

export const loginSubmited = createAction('LOGIN_SUBMITED', values => values);
export const loggedIn = createAction('LOGGED_IN', token => token);
export const updatedToken = createAction('UPDATED_TOKEN', token => token);
export const loggedOut = createAction('LOGGED_OUT');
export const changePassword = createAction('CHANGE_PASSWORD', values => values);
export const passwordChanged = createAction('CHANGED_PASSWORD');
