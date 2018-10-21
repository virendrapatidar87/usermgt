import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { AppHeaderComponent } from './app-header/app-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import {UserlistComponent} from './users/userlist/userlist.component';
import {AdduserComponent} from './users/adduser/adduser.component';
import {ViewuserComponent} from './users/viewuser/viewuser.component';

import { UsersvcService } from './users/usersvc.service';
import { AuthGaurdService } from './auth-gaurd.service';
import { AuthService } from './auth.service';
import {NgxEditorModule} from 'ngx-editor';
import { EditpageComponent } from './managepage/editpage/editpage.component';
import { ChartsModule } from 'ng2-charts'
const appRoutes: Routes = [
   { path: 'dashboard', component: ViewuserComponent,canActivate:[AuthGaurdService] },
   { path: 'login', component: LoginComponent },
   { path: 'manageuser', component: UserlistComponent,canActivate:[AuthGaurdService] },
   { path: 'adduser/:id', component: AdduserComponent,canActivate:[AuthGaurdService] },
   { path: 'adduser', component: AdduserComponent,canActivate:[AuthGaurdService] },
   { path: 'managePage/:id', component:EditpageComponent,canActivate:[AuthGaurdService]},
   { path: '', component: DashboardComponent,canActivate:[AuthGaurdService] }];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    DashboardComponent,
    RegisterComponent,
    AppNavbarComponent,
    AppFooterComponent,
    UserlistComponent,
    AdduserComponent,
    ViewuserComponent,
    EditpageComponent


  ],
  imports: [
    BrowserModule, HttpClientModule,  BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    NgxEditorModule,ChartsModule, RouterModule.forRoot(

      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  entryComponents: [
    LoginComponent,
    DashboardComponent,RegisterComponent,AppNavbarComponent,UserlistComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  },  LoginService,
  
   UsersvcService,AuthService,AuthGaurdService],

  bootstrap: [AppComponent]
})
export class AppModule { }
