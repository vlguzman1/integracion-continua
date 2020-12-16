import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';
import * as fromComponents from './components';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        canActivate: [fromGuards.LoggedOutGuard],
        loadChildren: 'app/modules/auth/login/login.module#LoginModule',
      },
      {
        path: 'register',
        canActivate: [fromGuards.LoggedOutGuard],
        loadChildren: 'app/modules/auth/register/register.module#RegisterModule',
      },
      {
        path: 'recovery-password',
        canActivate: [fromGuards.LoggedOutGuard],
        loadChildren: 'app/modules/auth/recovery-password/recovery-password.module#RecoveryPasswordModule',
      },
    ]
  },
  { path: '**', component: fromComponents.ErrorComponent },
];

export const CoreRouting = RouterModule.forRoot(routes);
