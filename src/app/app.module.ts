import { FormComponent } from './form/form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { FlexModule } from '@angular/flex-layout';
import {MatDialogModule, MatToolbarModule, MatButtonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import { PublicAreaComponent } from './public-area/public-area.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { UserDataComponent } from './user-data/user-data.component';

const materialModules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    FormComponent,
    PublicAreaComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    AdminComponent,
    AdminFormComponent,
    UserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    materialModules,
    FlexModule,
    NgbModule.forRoot()
  ],
  exports: materialModules,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
