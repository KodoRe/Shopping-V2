import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/operator/take'; 

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category = {}; 
  id;
  replaceCategoryName;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private mdr: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any    
  ) {
    this.id = this.data.catKey; //this.route.snapshot.paramMap.get('id');
    this.replaceCategoryName = this.data.nameToReplace;
    
    if (this.id) {
      this.categoryService.get(this.id).take(1).subscribe(c => this.category = c);
    }
  }

  save(category) { 
    if (this.id) 
    {
      this.categoryService.update(this.id, category);
      this.productService.renameProductsWithOldCategoryNameToNewName(this.replaceCategoryName, category.name);
    }
    else this.categoryService.create(category);

    this.router.navigate(['/admin/categories']);
    this.mdr.close();
  }
  delete() {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    this.categoryService.delete(this.id);
    this.router.navigate(['/admin/categories']);
    this.mdr.close();
  }

  ngOnInit() {
  }

}
