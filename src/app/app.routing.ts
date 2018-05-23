import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from "./register/register.component";
import { AuthguardService }  from './service/authguard.service';
import { LoanComponent } from "./loan/loan.component";
import { AddloanComponent } from "./addloan/addloan.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const appRoutes: Routes = [
   
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthguardService],
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'loan', component: LoanComponent },
        { path: 'loan/add', component: AddloanComponent }
      ] },
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);