import { LoginComponent } from '../login/login.component';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, TooltipPosition } from '@angular/material';
import { Subscription } from 'rxjs';
import { ShopInfoService } from 'shared/services/shop-info.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  cartSubscription: Subscription;
  shopConfigurationSubscription: Subscription;
  shopGpsCoords = {lat: 0, lng: 0};
  position: TooltipPosition = 'below';
  navigatewazemessage: string = "Navigate with Waze"
  copyrightsmessage: string = "Hen Tzarfati & Nitai Ben Shaul"
  contactmessage: string = "Contact Us";
  loginmessage: string = "Login";
  menumessage: string = "User Menu";
  cartmessage: string = "Shopping Cart";
  hideDelay = 200;


  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private shopConfigService: ShopInfoService,
    private dialog: MatDialog
  ){ 
  }

  async ngOnInit() { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shopConfigurationSubscription = this.shopConfigService.get().subscribe(shopConfiguration => {
      this.shopGpsCoords.lat = shopConfiguration.location.lat;
      this.shopGpsCoords.lng = shopConfiguration.location.lng;
    });
    this.cartSubscription = this.shoppingCartService.login().subscribe((click) => {
    this.openLoginDialog();
    });
    //this.cart$ = await this.shoppingCartService.getCart(); // << This line caused the bug of first time user, make 2 carts in firebase.
    // V - this method fix the 2 carts by delaying the shoppingCart.getQuantity, so when it execute there is already a userID.
    setTimeout(async () => {
      this.cart$ = await this.shoppingCartService.getCart();
      }, 1800);
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

  scrollTop() {
    window.scrollTo(0, 0);
  }
  
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.shopConfigurationSubscription.unsubscribe();
  }
}
