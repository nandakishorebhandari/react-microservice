/* @flow */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import addSeconds from 'date-fns/add_seconds';

import { loggedIn, loggedOut, updatedToken, passwordChanged } from '../actions/auth.js';

export default handleActions(
    {
        [loggedIn]: (state: Object, { payload }: { payload: Object }): Object =>
            state.set(
                'token',
                fromJS({
                    ...payload,
                    expire_date: addSeconds(new Date(), payload.expires_in),
                })
            ),
        [updatedToken]: (state: Object, { payload }: { payload: Object }): Object =>
            state.set(
                'token',
                fromJS({
                    ...payload,
                    expire_date: addSeconds(new Date(), payload.expires_in),
                })
            ),
        [loggedOut]: (state: Object): Object => state.delete('token'),
        [passwordChanged]: (state: Object): Object => state.set('passwordChanged', true),
    },
    fromJS({})
);
