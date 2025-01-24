import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from './+state/user.reducer';
import { selectUserToken } from './+state/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<UserState>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSignal(selectUserToken)()
    var authRequest = req.clone({      
      headers: req.headers.set('Authorization', 'token ' + token)
    })
    return next.handle(authRequest)
  }
}
