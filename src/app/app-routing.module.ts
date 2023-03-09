import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { BlogDialogComponent } from './blog/blog-dialog/blog-dialog.component';

const routes: Routes = [
  {path:'',redirectTo:'blog', pathMatch:'full'},
  {path:'blog',component:BlogComponent},
  {path:'blogDialog/:id',component:BlogDialogComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'user',component:UserComponent},
  {path:'userDialog',component:UserDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
