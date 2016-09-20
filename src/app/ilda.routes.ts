import { Routes, RouterModule } from '@angular/router';

const routes: Routes  = [
  {path: '', redirectTo: '/unites', pathMatch : 'prefix'}
];

export const routing = RouterModule.forRoot(routes);
