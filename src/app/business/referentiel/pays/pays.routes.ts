import { Routes, RouterModule }  from '@angular/router';
import { PaysListPageComponent } from './pages';

export const PAYS_LISTE = 'pays';
/**
 * Routes des pays
 * @type {{path: string, component: PaysListPageComponent}|{path: string, component: PaysDetailPageComponent}[]}
 */
export const paysRoutes: Routes = [
  {path: PAYS_LISTE, component: PaysListPageComponent}
];

export const paysRouting = RouterModule.forChild(paysRoutes);
