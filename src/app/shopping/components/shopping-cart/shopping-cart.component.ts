import { Subscription } from 'rxjs/Rx';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DialogsService } from 'shared/services/dialogs.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  subscription: Subscription;
  user = null;
  result: boolean;
  public loading = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private auth: AuthService,
    private dialogsService: DialogsService 
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription = this.auth.appUser$.subscribe((u: any) => {
      if (u) { 
        this.user = u;
      }
      else {
        this.user = null;
      }
      this.loading = false;
    })
  }

  loginClick() {
    this.shoppingCartService.login();
  }

  clearCart() { 
    this.dialogsService
    .confirm('', 'Are you sure you want to clear your shopping cart?')
    .subscribe( res => {
      if (res)
        this.shoppingCartService.clearCart();
    });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
