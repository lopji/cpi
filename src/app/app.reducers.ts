// reselect
import {createSelector} from "reselect";

// @ngrx
import {ActionReducer, combineReducers} from "@ngrx/store";
import {compose} from "@ngrx/core/compose";
import {routerReducer, RouterState} from "@ngrx/router-store";
import {storeFreeze} from "ngrx-store-freeze";

// environment
import {environment} from "../environments/environment";


import * as users from "./users/users.reducers";


export interface State {
  router: RouterState;
  users: users.State;
}

const reducers = {
  router: routerReducer,
  users: users.reducer
};

// development reducer includes storeFreeze to prevent state from being mutated
const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

// production reducer
const productionReducer: ActionReducer<State> = combineReducers(reducers);

/**
 * The single reducer function.
 * @function reducer
 * @param {any} state
 * @param {any} action
 */
export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/**********************************************************
 * Users Reducers
 *********************************************************/

/**
 * Returns the user state.
 * @function getUserState
 * @param {State} state Top level state.
 * @return {State}
 */
export const getUsersState = (state: State) => state.users;

/**
 * Returns the authenticated user
 * @function getAuthenticatedUser
 * @param {State} state
 * @param {any} props
 * @return {User}
 */
export const getAuthenticatedUser = createSelector(getUsersState, users.getAuthenticatedUser);

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getAuthenticationError = createSelector(getUsersState, users.getAuthenticationError);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticated = createSelector(getUsersState, users.isAuthenticated);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticatedLoaded = createSelector(getUsersState, users.isAuthenticatedLoaded);

/**
 * Returns true if the authentication request is loading.
 * @function isAuthenticationLoading
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticationLoading = createSelector(getUsersState, users.isLoading);

/**
 * Returns the sign out error.
 * @function getSignOutError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignOutError = createSelector(getUsersState, users.getSignOutError);

/**
 * Returns the sign up error.
 * @function getSignUpError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignUpError = createSelector(getUsersState, users.getSignUpError);
