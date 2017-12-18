
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'angular4-carousel';


import { LoginComponent } from '../core/components/login/login.component';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderViewComponent } from '../shared/components/order-view/order-view.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { MyMessagesComponent } from './components/my-messages/my-messages.component'; 
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactFormComponent } from './components/contact-us/contact-form/contact-form.component';
import { ContactSuccessComponent } from './components/contact-success/contact-success.component'; 


import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AgmCoreModule } from '@agm/core'; //Angular Google Maps



@NgModule({
  imports: [
    SharedModule,
    CarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHAiHN1NQAOEbG1RDHTXOF_6N64gTqM-o'
    }),
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my/orders/:id', component: OrderViewComponent, canActivate: [AuthGuard] },    
      { path: 'contact-us', component: ContactUsComponent }, 
      { path: 'my/messages', component: MyMessagesComponent },   
    ]),
  ],
  entryComponents: [
    //This is for now, maybe later when we add calling to service and more things it will not be neccessery.
    //Its neccessery now because nothing loaded in the dom, so angular don't know that component.
    //Hen Tz.
    ProductViewComponent,
  ],
  declarations: [
    ProductsComponent,
    ProductViewComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ContactUsComponent,
    ContactFormComponent,
    MyMessagesComponent,
    ContactSuccessComponent,
  ],
})
export class ShoppingModule { }
