import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from '../../+state/user.reducer';
import { selectUserErrorMessage } from '../../+state/user.selectors';
import { LoginInfo } from '../../models/user';
import { UserPageActions } from '../../+state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  constructor(private fb: FormBuilder,
    private store: Store<UserState>
  ){}

  errorMessage$ = this.store.select(selectUserErrorMessage);

  loginForm = this.fb.nonNullable.group({
    email: '',
    pwd: '',
  })

  loginUser() {
    if (this.loginForm.invalid) {
      return
    }
    const info: LoginInfo = this.loginForm.getRawValue()
    this.store.dispatch(UserPageActions.loginUser({info}))

  }


}
