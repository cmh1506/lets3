import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { UserState } from './+state/user.reducer';
import { selectAdmin } from './+state/user.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<UserState>);
  return store.select(selectAdmin) 
};