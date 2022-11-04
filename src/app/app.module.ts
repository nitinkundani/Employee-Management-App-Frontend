import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { myDatePipe } from './myDatePipe/myDatePipe';
import { myDatePipe } from './myDatePipe/myDatePipe';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { EmployeeComponent } from './employee/employee.component';
//import { RegisterComponent } from './register/register.component';
//import { LoginComponent } from './login/login.component';
//import { RegisterLoginService } from './shared/register-login.service';
import { EmployeeService } from './shared/employee.service';
// import { NotificationService } from './shared/notification.service';
import { DataProviderService } from './shared/data-provider.service';
//import { environment } from '../environments/environment';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import {TableModule} from 'primeng/table';

// import { DateComponent } from './date/date.component';
// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';


const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login', //component:LoginComponent
    // loadChildren:'./login/login.module#LoginModule' 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {path:'register', 
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {path:'home',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  }, 
  {path:'employee/:username',
    loadChildren: () => import('./employee-details/employee-details.module').then(m => m.EmployeeDetailsModule)
  },
  {path:'date',
    loadChildren: () => import('./date/date.module').then(m => m.DateModule)
  }, 
  {path:'change-detection',
    loadChildren: () => import('./change-detection/change-detection.module').then(m => m.ChangeDetectionModule)
  }, 

];

export let AppInjector : Injector;

@NgModule({
  declarations: [
    AppComponent,
    // ChangeDetectionComponent,
    // myDatePipe
    // DateComponent,
    // EmployeeComponent,
    //RegisterComponent,
    //LoginComponent,
    // EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), 
    TableModule
    // myDatePipe
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, EmployeeService, DatePipe, DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){
    AppInjector = this.injector;
  }
}