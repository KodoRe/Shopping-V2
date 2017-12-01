import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductViewComponent } from '../../../shopping/components/product-view/product-view.component';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

@Component({
  selector: 'product-card',
  encapsulation: ViewEncapsulation.None, //Without it, i can't fix the carousel css to my tastes.. in this component shadow-dom is disabled so css is mixing toghter.
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 
  @Input('showDescription') showDescription = false;
  
  constructor(
    private cartService: ShoppingCartService,
    private dialog: MatDialog
  ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
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

 public config: ICarouselConfig = {
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
}
