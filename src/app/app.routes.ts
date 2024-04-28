import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', loadComponent: () => import('./main/main.page').then(m => m.MainPage) },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.page').then(m => m.ProductListPage)
  },
  {
    path: 'mercado',
    loadComponent: () => import('./mercado/mercado.page').then( m => m.MercadoPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./page/auth/login/login.page').then( m => m.LoginPage)
  }

];
