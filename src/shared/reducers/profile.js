import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  profileFullyFilled,
  profileFillNeedy,
  checkProfileInfo,
  setProfileFilled,
  setProfile,
  uploadInProgress,
  setAvatarUrl,
  showNotification
} from '../actions/profile';

export default handleActions(
  {
    [checkProfileInfo]: state => state.set('checking', true),
    [setProfile]: (state, { payload: userData }) => state.set('user', fromJS(userData)),
    [showNotification]: (state, { payload }) => state.set('showNotification', payload),
    [profileFullyFilled]: state => state.delete('checking').set('filled', true),
    [profileFillNeedy]: state => state.delete('checking'),
    [setProfileFilled]: state => state.set('filled', true),
    [uploadInProgress]: (state,{payload}) => state.setIn(['avatar','uploading'], payload.status).setIn(['avatar','errorMsg'],payload.errorMsg),
    [setAvatarUrl]: (state,{payload}) => state.setIn(['user','avatarUrl'],'file/'+payload.fileId),
  },
  fromJS({})
);

