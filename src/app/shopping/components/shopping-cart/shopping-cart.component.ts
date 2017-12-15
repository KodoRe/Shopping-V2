import { Subscription } from 'rxjs/Rx';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  subscription: Subscription;
  user = null; 

  constructor(
    private shoppingCartService: ShoppingCartService,
    private auth: AuthService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription = this.auth.appUser$.subscribe((u: any) => {
      if (u) { 
        this.user = u;
      }
      else {
        this.user = null;
      }
    })
  }

  clearCart() { 
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
