import firebase from 'firebase/compat'

export enum authAction {
  REGISTER_MAIL = 'register_with_mail',
  LOGIN_MAIL = 'login_with_mail',
  LOGIN_GOOGLE = 'login_with_google',
  LOGOUT = 'logout',
}
