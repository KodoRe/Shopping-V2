import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


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
  imageUrl: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.category = this.data.category;
    this.title = this.data.title;
    this.description = this.data.description;
    this.price = this.data.price;
    this.imageUrl = this.data.imageUrl;
  }

  ngOnInit()
  {
    
  }

 
}
