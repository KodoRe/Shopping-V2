import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take'; 

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category = {}; 
  id;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService,     
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.categoryService.get(this.id).take(1).subscribe(c => this.category = c);
    }
  }

  save(category) { 
    if (this.id) 
    {
      this.categoryService.update(this.id, category);
      //console.log(this.id);
      this.productService.renameProductsWithOldCategoryNameToNewName(this.route.snapshot.paramMap.get('name'), category.name);
    }
    else this.categoryService.create(category);

    this.router.navigate(['/admin/categories']);
  }
  delete() {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    this.categoryService.delete(this.id);
    this.router.navigate(['/admin/categories']);
  }

  ngOnInit() {
  }

}
