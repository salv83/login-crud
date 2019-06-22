import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicAreaComponent } from './public-area/public-area.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {path: '', component: PublicAreaComponent },
  {path: 'private', component: ProductComponent, canActivate: [LoginGuard]  },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'public', component: PublicAreaComponent },
  {path: 'admin', component: AdminComponent, canActivate: [LoginGuard]  },
  {path: 'logout', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
