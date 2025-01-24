import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo, Token, User } from './models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from './+state/user.reducer';
import { Router } from '@angular/router';
import { selectUserAuthenticated } from './+state/user.selectors';
import { UserPageActions } from './+state/user.actions';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private store: Store<UserState>,
    private router: Router
  ) { }

  path = environment.path + "/users"

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.path + '/users')
  }

  registerUser(user: User): Observable<Token> {
    return this.httpClient.post<Token>(this.path + '/register', user)
      .pipe(catchError(this.handleError))
  }

  loginUser(loginInfo: LoginInfo): Observable<Token> {
    return this.httpClient.post<Token>(this.path + '/login', loginInfo)
      .pipe(catchError(this.handleError))
  }
  

  update(user: User): Observable<User> {
    return this.httpClient
      .put<User>(environment.path + '/users/' + user._id, user)
      .pipe(catchError(this.handleError));
  }

  get isAuthenticated() {
    return this.store.select(selectUserAuthenticated)
  }

  logout() {
    this.store.dispatch(UserPageActions.logoutUser())
    this.router.navigate(['/login']);
  }

  private handleError({ error }: HttpErrorResponse) {
    return throwError(
      () => `${error}`
    );
  }
}
