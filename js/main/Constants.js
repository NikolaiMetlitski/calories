var keyMirror = require('keymirror');

module.exports = keyMirror({
  CONSTANT_NAME: null,

  LOGIN: 'login',
  LOGOUT: 'logout',

  SIGN_UP_REQUEST: 'sign_up_request',
  SIGN_UP_ATTEMPT: 'sign_up_attempt',
  SIGN_UP_SUCCESS: 'sign_up_success',

  LOAD_RECORDS_REQUEST: 'load_records_request',
  LOAD_RECORDS_SUCCESS: 'load_records_success',

  CREATE_USER_REQUEST: 'create_user_request',
  CREATE_USER_SUCCESS: 'create_user_success',

  CREATE_RECORD_REQUEST: 'create_record_request',
  CREATE_RECORD_SUCCESS: 'create_record_success',

  SET_ACTIVITY: 'set_activity',
  ACTIVITY_VIEW_RECORDS: 'activity_view_records',
  ACTIVITY_CREATE_RECORD: 'activity_create_record',
  ACTIVITY_UPDATE_RECORD: 'activity_update_record',

  ACTIVITY_VIEW_USERS: 'activity_view_users',
  ACTIVITY_CREATE_USER: 'activity_create_user',
  ACTIVITY_UPDATE_USER: 'activity_update_user',

  EDIT_RECORD_REQUEST: 'edit_record_request',
  UPDATE_RECORD_REQUEST: 'update_record_success',
  UPDATE_RECORD_SUCCESS: 'update_record_success',

  EDIT_USER_REQUEST: 'edit_record_request',
  UPDATE_USER_REQUEST: 'update_user_success',
  UPDATE_USER_SUCCESS: 'edit_user_success',

  DELETE_RECORD_REQUEST: 'delete_record_request',
  DELETE_RECORD_SUCCESS: 'delete_record_success',
  DELETE_RECORD_FAILURE: 'delete_record_failure',

  DELETE_USER_REQUEST: 'delete_user_success',
  DELETE_USER_SUCCESS: 'delete_user_success',
  DELETE_USER_FAILURE: 'delete_user_failure'
});
