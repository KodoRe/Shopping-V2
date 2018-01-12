import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  mobileCategoriesHide = false;//true; //for mobile view

  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

  toggleMobileCategories() {
    this.mobileCategoriesHide = !this.mobileCategoriesHide;
  }
  
  ngOnInit() {
  }

}
