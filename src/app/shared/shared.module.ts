import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataTableModule } from 'angular-4-data-table/dist';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'angular4-carousel';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductViewComponent } from '../shopping/components/product-view/product-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ContactService } from './services/contact.service';
import { UserService } from './services/user.service';

//import { ngSelectLocation } from './components/location/browser-location'; //Get Location Service

@NgModule({
  imports: [
//    ProductViewComponent,
    CarouselModule,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ProductCardComponent,
//    ProductViewComponent,
    ProductQuantityComponent,
    //ngSelectLocation,    
    OrderViewComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    //ngSelectLocation,    
    OrderViewComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    ContactService
  ]
})
export class SharedModule { }
