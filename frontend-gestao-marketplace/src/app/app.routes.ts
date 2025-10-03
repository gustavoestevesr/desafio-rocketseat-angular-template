import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { LayoutComponent } from './components/layout/layout.component';
import { Products } from './pages/products/products';
import { NewProduct } from './pages/new-product/new-product';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'products', component: Products },
      { path: 'new-product', component: NewProduct },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
