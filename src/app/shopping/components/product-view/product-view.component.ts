import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICarouselConfig, AnimationConfig } from '../../../modules/angular4-carousel';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  category: string;
  title: string;
  description: string;
  price: number;
  images = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.category = this.data.category;
    this.title = this.data.title;
    this.description = this.data.description;
    this.price = this.data.price;
    this.images = this.data.images;
  }

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: false,
    autoplayDelay: 2000,
    stopAutoplayMinWidth: 768
  };

  ngOnInit()
  {
    
  } 
}
