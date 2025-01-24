import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from '../../+state/user.reducer';
import { selectUserErrorMessage } from '../../+state/user.selectors';
import { UserPageActions } from '../../+state/user.actions';
import { User } from '../../models/user';
import { Role } from '../../models/role';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
    private store: Store<UserState>
  ){}

  errorMessage$ = this.store.select(selectUserErrorMessage);

  registerForm = this.fb.nonNullable.group({
    _id: '',
    email: '',
    pwd: '',
    name: '',
    role: Role.Basic
  })

  registerUser() {
    if (this.registerForm.invalid) {
      return
    }
    const user: User = this.registerForm.getRawValue()
    this.store.dispatch(UserPageActions.registerUser({user}))
  }


}
