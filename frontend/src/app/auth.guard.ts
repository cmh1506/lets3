import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { UserState } from './+state/user.reducer';
import { selectUserAuthenticated } from './+state/user.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<UserState>);  
  return store.select(selectUserAuthenticated);
};
