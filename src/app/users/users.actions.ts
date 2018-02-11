// import @ngrx
import {Action} from "@ngrx/store";

// import type function
import {type} from "../core/util";

// import models
import {User} from "../core/models/user";

export const ActionTypes = {
  AUTHENTICATE: type("[users] Authenticate"),
  AUTHENTICATE_ERROR: type("[users] Authentication error"),
  AUTHENTICATE_SUCCESS: type("[users] Authentication success"),
  AUTHENTICATED: type("[users] Authenticated"),
  AUTHENTICATED_ERROR: type("[users] Authenticated error"),
  AUTHENTICATED_SUCCESS: type("[users] Authenticated success"),
  SIGN_OUT: type("[users] Sign off"),
  SIGN_OUT_ERROR: type("[users] Sign off error"),
  SIGN_OUT_SUCCESS: type("[users] Sign off success")
};

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action}
 */
export class AuthenticateAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE;

  constructor(public payload: {email: string, password: string}) {}
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action}
 */
export class AuthenticatedAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED;

  constructor(public payload?: {token?: string}) {}
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action}
 */
export class AuthenticatedSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  constructor(public payload: {authenticated: boolean, user: User}) {}
}

/**
 * Authenticated check error.
 * @class AuthenticatedErrorAction
 * @implements {Action}
 */
export class AuthenticatedErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action}
 */
export class AuthenticationErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action}
 */
export class AuthenticationSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: {user: User}) {}
}

/**
 * Sign out.
 * @class SignOutAction
 * @implements {Action}
 */
export class SignOutAction implements Action {
  public type: string = ActionTypes.SIGN_OUT;
  constructor(public payload?: any) {}
}

/**
 * Sign out error.
 * @class SignOutErrorAction
 * @implements {Action}
 */
export class SignOutErrorAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_ERROR;
  constructor(public payload?: any) {}
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action}
 */
export class SignOutSuccessAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}


/**
 * Actions type.
 * @type {Actions}
 */
export type Actions
  =
  AuthenticateAction
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction;
