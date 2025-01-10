import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule) },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), 
      canActivate: [AuthGuard]
    },
    { 
      path: 'admin', 
      loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
      canActivate: [AuthGuard] 
    },
    { path: '**', redirectTo: '' }
  ];
