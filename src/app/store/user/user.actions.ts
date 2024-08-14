import { Action } from "@ngrx/store";
import { EmailPasswordCredentials, UserCreateRequest, UserRequest, UserResponse } from "./user.models";
import { Type } from "@angular/core";

//coleccion de operaciones que se van a realizar con sus estados
export enum Types {
  //validar si el usuario esta autorizado
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',//sesion
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',//no esta en sesion
  INIT_ERROR = '[User] Init: Error',//error logico

  //login
  SIGN_IN_EMAIL = '[User] Login: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Login: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Login: Error',

  //registro
  SIGN_UP_EMAIL = '[User] Registrar usuario con Email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Registrar usuario con Email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Registrar usuario con Email: Error',

  //sali de sesion
  SIGIN_OUT_EMAIL = '[User] Logout: Start',
  SIGIN_OUT_EMAIL_SUCCESS = '[User] Logout: Success',
  SIGIN_OUT_EMAIL_ERROR = '[User] Logout: Error',
}

//metodos actions que llaman a los estados
export class Init implements Action {
  readonly type = Types.INIT;
  constructor() {}
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public email: string, public user: UserResponse | null) {}
}


export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor() {}
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor(public error: string) {}
}



export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {} //lo defini en el model para que me pida el email y el password
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public email: string, public user: UserResponse) {}
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;
  constructor(public error: string) {}
}



export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(public user: UserCreateRequest) {}
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
  constructor(public email: string, public user: UserResponse | null) {}
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;
  constructor(public error: string) {}
}



export class SignOut implements Action {
  readonly type = Types.SIGIN_OUT_EMAIL;
  constructor() {}
}

export class SignOutSuccess implements Action {
  readonly type = Types.SIGIN_OUT_EMAIL_SUCCESS;
  constructor() {}
}

export class SignOutError implements Action {
  readonly type = Types.SIGIN_OUT_EMAIL_ERROR;
  constructor(public error: string) {}
}


//exportar todos los metodos
export type All =
Init
| InitAuthorized
| InitUnauthorized
| InitError
| SignInEmail
| SignInEmailSuccess
| SignInEmailError
| SignUpEmail
| SignUpEmailSuccess
| SignUpEmailError
| SignOutSuccess
| SignInEmail
| SignOutError;
