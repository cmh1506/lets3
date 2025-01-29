import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { adminGuard } from './admin.guard';
import { UserFormComponent } from './user/user-form/user-form.component';
import { authGuard } from './auth.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  
  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-list', /* canActivate: [adminGuard], */ component: UserListComponent },
  { path: 'main', canActivate: [authGuard], component: MainComponent },
  { path: 'user-form/:_id', canActivate: [adminGuard], component: UserFormComponent },
  { path: '**', redirectTo: 'login' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
