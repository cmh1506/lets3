import { Component, OnInit } from '@angular/core';
import { UserState } from '../../+state/user.reducer';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../+state/user.selectors';
import { UserPageActions } from '../../+state/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { ChatDialogComponent } from '../../chat-dialog/chat-dialog.component';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'lets-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false
})
export class UserListComponent implements OnInit{
  
  constructor(
    private store: Store<UserState>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(UserPageActions.loadUsers())
  }

  users$ = this.store.select(selectUsers)
  displayedColumns = ['name'/* , 'role' */];
  errorMessage$ = ""/* this.store.select(selectMaterialsErrorMessage) */


  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}
