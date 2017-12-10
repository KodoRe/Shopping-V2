import { AuthService } from '../../services/auth.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductViewComponent } from '../../../shopping/components/product-view/product-view.component';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'product-card',
  encapsulation: ViewEncapsulation.None, //Hen: Without it, i can't fix the carousel css to my tastes.. in this component shadow-dom is disabled so css is mixing toghter.
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 
  @Input('showDescription') showDescription = false;
  public carouselEnabled = true;
  public userName: string = null; //  by this parameter i know if the user is authenticated or not, so i can popup an alert "login needed".
  public subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private dialog: MatDialog,
    private auth: AuthService
  ){ 
    this.subscription = this.auth.appUser$.subscribe(u => {
      if (u !== null)
        this.userName = u.name;   
      else
        this.userName = null;   
    });
  }

  addToCart() {
    if (this.userName)
    {
      this.cartService.addToCart(this.product);     
    }
    else
    {
      alert("Please Login in order to use this feature");
    }
 }

  openDialog() {
    this.dialog.open(ProductViewComponent, {
      data: {
            title:this.product.title,
            description:this.product.description,
            images:this.product.images,
            category:this.product.category,
            price:this.product.price
      }
    });
  }
  
  public refreshCarousel(): void {
    //Hen: Carousel Plugin has bug, in some conditions it does not re-rendering itself to show the new images.
    //By using the next method it forces the carousel component to be rerendered by using the carouselEnabled with *ngIf.
      this.carouselEnabled = false;
  
      setTimeout(() => {
        this.product.images.controls = this.product.images.controls; //re-rendering the same array we got.
  
        this.carouselEnabled = true;
      });
    }

 public carouselConfig: ICarouselConfig = {
   verifyBeforeLoad: false,
   log: false,
   animation: true,
   animationType: AnimationConfig.SLIDE,
   autoplay: false,
   autoplayDelay: 2000,
   stopAutoplayMinWidth: 768
 };

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
