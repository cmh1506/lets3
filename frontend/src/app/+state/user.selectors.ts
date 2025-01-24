import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { getRouterSelectors } from '@ngrx/router-store';

export const selectUserState =
  createFeatureSelector<UserState>('user')

export const selectUserToken = createSelector(
  selectUserState,
  ({ token }) => token?.token
)

export const selectUsers = createSelector(
  selectUserState,
  ({ users }) => users
)

export const selectAdmin = createSelector(
  selectUserState,
  ({ admin }) => admin
)

export const selectUserErrorMessage = createSelector(
  selectUserState,
  ({ errorMessage }) => errorMessage
)

export const selectUserAuthenticated = createSelector(
  selectUserState,
  ({ authenticated }) => authenticated
)

export const { selectRouteParams } = getRouterSelectors();

export const selectUserById = createSelector(
  selectRouteParams,
  selectUserState,
  ({ _id }, { users }) =>
    users.find((user) => user._id === _id)  
)