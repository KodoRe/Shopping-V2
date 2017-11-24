import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';4
import { OrderViewComponent } from './components/order-view/order-view.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from "shared/services/auth-guard.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'admin/categories/new', 
        component: CategoryFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/categories/:id/:name', 
        component: CategoryFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/categories', 
        component: AdminCategoriesComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/orders/:id', 
        component: OrderViewComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ])            
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    OrderViewComponent,
    AdminOrdersComponent,
    CategoryFormComponent,
    AdminCategoriesComponent
  ]
})
export class AdminModule { }
