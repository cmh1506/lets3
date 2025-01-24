import { Component, OnInit } from '@angular/core';
import { UserState } from '../../+state/user.reducer';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../+state/user.selectors';
import { UserPageActions } from '../../+state/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false
})
export class UserListComponent implements OnInit{
  
  constructor(
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UserPageActions.loadUsers())
  }

  users$ = this.store.select(selectUsers)
  displayedColumns = ['name', 'role'
  ];
  errorMessage$ = ""/* this.store.select(selectMaterialsErrorMessage) */

}
