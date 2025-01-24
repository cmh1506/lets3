import { createReducer, on } from "@ngrx/store"
import { UserAPIActions, UserPageActions } from "./user.actions"
import { Token, User } from "../models/user"
import { Role } from "../models/role"

export interface UserState {
  users: User[]
  token: Token | null
  errorMessage: string
  authenticated: boolean
  admin: boolean
}
const initialState: UserState = {
  users: [],
  token: null,
  errorMessage: '',
  authenticated: false,
  admin: false
}

export const userReducer = createReducer(
  initialState,
  on(UserAPIActions.userRegistrationSuccess, (state: UserState, { token }) => ({
    ...state,
    token: token,
    errorMessage: '',
    authenticated: true,
    admin: (token.role.toString() === 'Admin')
  })),
  on(UserAPIActions.userRegistrationFailure, (state: UserState, { message }) => ({
    ...state,
    token: null,
    errorMessage: message,
    authenticated: false
  })),
  on(UserAPIActions.userLoginSuccess, (state: UserState, { token }) => ({
    ...state,
    token: token,
    errorMessage: '',
    authenticated: true,
    admin: (token.role.toString() === 'Admin')
  })),
  on(UserAPIActions.userLoginFailure, (state: UserState, { message }) => ({
    ...state,
    token: null,
    errorMessage: message,
    authenticated: false
  })),
  on(UserPageActions.logoutUser, (state: UserState) => ({
    ...state,
    token: null,
    errorMessage: '',
    authenticated: false,
    admin: false,
    users: []
  })),
  on(UserAPIActions.usersLoadedSuccess, (state, { users }) => ({
    ...state,
    users: users
  })),
  on(UserAPIActions.usersLoadedFail, (state, { message }) => ({
    ...state,
    errorMessage: message
  })),
  on(UserAPIActions.userUpdatedSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((existingUser) =>
      existingUser._id === user._id ? user : existingUser
    )
  })),
  on(UserAPIActions.userUpdatedFail, (state, { message }) => ({
    ...state,
    errorMessage: message
  }))
)