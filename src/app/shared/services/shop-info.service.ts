import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ShopInfoService {

  constructor(private db: AngularFireDatabase) { }

  get() {
    return this.db.object('/shop-info/');
  }

  update(shopInfo) { 
    return this.db.object('/shop-info/').update(shopInfo);
  }
}
