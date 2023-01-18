import firebase from 'firebase/compat'

export enum authAction {
  REGISTER_MAIL = 'register_with_mail',
  LOGIN_MAIL = 'login_with_mail',
  LOGIN_GOOGLE = 'login_with_google',
  LOGOUT = 'logout',
}
export interface AuthContextModel {
  user: firebase.User | null
  loginWithGoogle: () => Promise<firebase.auth.UserCredential>
  loginWithEmail: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  registerWithEmail: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  logout: () => Promise<void>
}
