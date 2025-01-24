import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginInfo, Token, User } from "../models/user";
import { Update } from "@ngrx/entity";

export const UserPageActions = createActionGroup({
  source: 'User Page',
  events: {
    'Register User': props<{ user: User }>(),
    'Login User': props<{ info: LoginInfo }>(),
    'Logout User': emptyProps(),
    'Load Users': emptyProps(),
    'Update User': props<{ user: User }>()
  }
})

export const UserAPIActions = createActionGroup({
  source: 'User API',
  events: {
    'User Registration Success': props<{ token: Token }>(),
    'User Registration Failure': props<{ message: string }>(),
    'User Login Success': props<{ token: Token }>(),
    'User Login Failure': props<{ message: string }>(),
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Fail': props<{ message: string }>(),
    'User Updated Success': props<{ user: User }>(),
    'User Updated Fail': props<{ message: string }>(),
  }
})