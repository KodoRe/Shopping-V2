import { UserService } from '../../../shared/services/user.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from "../../../shared/models/order";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {name: "", addressLine1: "", addressLine2: "", city: ""}; 
  chkRemmberInfo: any; //checkbox for remmember shipping info.
  userSubscription: Subscription;
  shippingSubscription: Subscription;
  userId: string;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService
  ){

  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => { //get current user id      
      this.userId = user.uid
      this.shippingSubscription = this.userService.get(this.userId).subscribe(user => { //get other user details
        if(user.shipping)
        {
          this.shipping.name = user.shipping.name;
          this.shipping.addressLine1 = user.shipping.addressLine1;
          this.shipping.addressLine2 = user.shipping.addressLine2;
          this.shipping.city = user.shipping.city;
        }
      })
    }); 
  }

  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
    this.shippingSubscription.unsubscribe();
  }
 
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    if (this.chkRemmberInfo)
    {
      //User choosed to save the current shipping info for next orders.
      this.userService.setShippingInfo(this.userId, this.shipping);      
    }
    this.router.navigate(['/order-success', result.key]);
  }    
}
