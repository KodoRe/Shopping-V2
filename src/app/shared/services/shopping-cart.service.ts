import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/map'; 
import { UserService } from '../services/user.service';
import { EmailService } from '../services/email.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private emailService: EmailService) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
           .map(x => new ShoppingCart(x.items));
 }

  async addToCart(product: Product) { 
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  

  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      lastActionDate: new Date().getTime()    
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  setCartUserId(uid: string) {
    let cartId = localStorage.getItem('cartId');
    if (cartId) 
       this.db.object('/shopping-carts/' + cartId).update({userId: uid});
  }

  setCartEmailSentDate(uid: string) {
    let cartId = localStorage.getItem('cartId');
    if (cartId) 
       this.db.object('/shopping-carts/' + cartId).update({emailSentDate : Date.now()});
  }

  removeOldCarts(uid: string) {
    let cartId = localStorage.getItem('cartId');
    if (cartId) 
    {
      let subscription = this.db.list('/shopping-carts').subscribe(c => {
        c.forEach(c => { 
          if (c.userId != uid) return; //this is not your cart, don't remove it.
          if (c.$key == cartId) return; //if your the same cart, don't remove yourself, just the others.
          this.db.object('/shopping-carts/' + c.$key).remove();
        });
        subscription.unsubscribe();
      });  
    }
  }

  sendMail(userId: string)
  {
    const subject =  "HNShopping is missing you";
    const body = "We have seen that you interested in our products but didnt make a purchase";
    this.userService.get(userId).subscribe(u => {
      if (u.email)
      { 
         this.emailService.sendEmail(u.email,u.name,subject,body).subscribe(data => {
            console.log(data);  
            this.setCartEmailSentDate(userId);          
        },
        errors => {
          //Handle error caused by sending of 400 status code.
            console.log(errors);
        })
      }
    }).unsubscribe();
  }

  private async getOrCreateCartId(): Promise<string> { 
      let cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;
      
      let result = await this.create();   
      localStorage.setItem('cartId', result.key);
      return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId).update({lastActionDate: Date.now()});
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        images: product.images,
        price: product.price,
        quantity: quantity
      });
    });
  }
}
