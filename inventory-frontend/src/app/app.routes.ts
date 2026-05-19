import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { InventoryListComponent } from './features/inventory/inventory-list/inventory-list';
import { DispatchComponent } from './features/dispatch/dispatch';
import { HistoryComponent } from './features/history/history';
import { ProductsComponent } from './features/products/products';
import { UsersComponent } from './features/users/users';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [roleGuard],
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      { 
        path: 'inventory', 
        component: InventoryListComponent 
      },
      { 
        path: 'products', 
        component: ProductsComponent
      },

      { 
        path: 'history', 
        component: HistoryComponent,
        canActivate: [roleGuard],
        data: { role: 'Administrador' }
      },
      { 
        path: 'users', 
        component: UsersComponent,
        canActivate: [roleGuard],
        data: { role: 'Administrador' }
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
