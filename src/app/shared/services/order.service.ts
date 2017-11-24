import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }

   getOrderDetailsByOrderId(orderId: string) {
    return this.db.object('/orders/' + orderId);     
    }

    markShipped(orderId, shippingDate) {
      return this.db.object('/orders/' + orderId).update({dateShipped: shippingDate});
    }
}
