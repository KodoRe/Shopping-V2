import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductViewComponent } from '../../../shopping/components/product-view/product-view.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 

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
            imageUrl:this.product.imageUrl,
            category:this.product.category,
            price:this.product.price
      }
    });
  }
}
