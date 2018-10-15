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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { AppHeaderComponent } from './app-header/app-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';



const appRoutes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent }];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    DashboardComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule,  BrowserAnimationsModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(

      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  entryComponents: [
    LoginComponent,
    DashboardComponent,RegisterComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  },  LoginService, ],

  bootstrap: [AppComponent]
})
export class AppModule { }
