import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heroes',
    loadComponent: () => import('./components/heroes/heroes.component'),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./components/detail/detail.component'),
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
];
