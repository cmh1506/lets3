import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { UserPageActions } from '../../+state/user.actions';
import { selectUserById, selectUserErrorMessage } from '../../+state/user.selectors';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from '../../+state/user.reducer';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: false
})
export class UserFormComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.user$.subscribe(u => {
      if (u) {
        this.userForm.setValue(u)
        this.title = `Benutzer ${u.name} editieren:`
      }
    })
  }

  user$ = this.store.select(selectUserById)

  title: string = ''

  errorMessage$ = this.store.select(selectUserErrorMessage);

  userForm = this.fb.nonNullable.group({
    _id: '',
    email: '',
    pwd: '',
    name: '',
    role: Role.Basic
  })

  updateUser() {
    if (this.userForm.invalid) {
      return
    }
    const user: User = this.userForm.getRawValue()
    this.store.dispatch(UserPageActions.updateUser({ user }))
  }

}


