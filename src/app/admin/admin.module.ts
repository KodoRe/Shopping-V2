import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/admin-products/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminInboxComponent } from './components/admin-inbox/admin-inbox.component';
import { OrderViewComponent } from '../shared/components/order-view/order-view.component';
import { CategoryFormComponent } from './components/admin-categories/category-form/category-form.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from "shared/services/auth-guard.service";
import { AdminStatisticsComponent } from './components/admin-statistics/admin-statistics.component';
import { DataTableModule } from './../modules/angular-4-data-table';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHAiHN1NQAOEbG1RDHTXOF_6N64gTqM-o'
    }),
    
    RouterModule.forChild([
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
      },
      { 
        path: 'admin/inbox', 
        component: AdminInboxComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/statistics', 
        component: AdminStatisticsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/shop', 
        component: AdminShopComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ])            
  ],
  entryComponents: [CategoryFormComponent],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    CategoryFormComponent,
    AdminCategoriesComponent,
    AdminInboxComponent,
    AdminStatisticsComponent,
    AdminShopComponent
  ]
})
export class AdminModule { }
