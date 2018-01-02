import { LoginComponent } from '../login/login.component';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private dialog: MatDialog
  ){ 
    
  }

  async ngOnInit() { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    //this.cart$ = await this.shoppingCartService.getCart(); // << This line caused the bug of first time user, make 2 carts in firebase.
    // V - this method fix the 2 carts by delaying the shoppingCart.getQuantity, so when it execute there is already a userID.
    setTimeout(async () => {
      this.cart$ = await this.shoppingCartService.getCart();
      }, 1500);
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      data: {
      }
    });
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }


  logout() {
    this.auth.logout();
    
  }

}
