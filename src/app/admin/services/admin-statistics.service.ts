import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AdminStatisticsService {

  constructor(private db: AngularFireDatabase) { }

  getShoppingCarts() {
    return this.db.list('/shopping-carts');
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getCartQuantityByCartIdAndKey(cartId, itemKey) { 
    return this.db.object('/shopping-carts/' + cartId + '/' + itemKey);
  }
}
