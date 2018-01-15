import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import 'rxjs/add/operator/take'; 
import { DialogsService } from 'shared/services/dialogs.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category = { name: ""}; 
  id;
  replaceCategoryName = "";
  result: boolean;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private mdr: MatDialogRef<CategoryFormComponent>,
    private dialogsService: DialogsService,
    @Inject(MAT_DIALOG_DATA) public data: any    
  ) {
    this.id = (this.data.catKey != "") ? this.data.catKey : null; //this.route.snapshot.paramMap.get('id');
    this.replaceCategoryName = this.data.nameToReplace;
    
    if (this.id) {
      this.categoryService.get(this.id).take(1).subscribe(c => this.category = c);
    }
  }

  save(category) 
  {     
    if (this.id) 
    {
      this.categoryService.update(this.id, category);
      this.productService.renameProductsWithOldCategoryNameToNewName(this.replaceCategoryName, category.name);
    }
    else this.categoryService.create(category);

    this.router.navigate(['/admin/categories']);
    this.mdr.close();
  }

  delete() 
  {
    this.dialogsService
    .confirm('', 'Are you sure you want to delete this category?')
    .subscribe( res => {
      this.result = res;
      if (this.result)
      {
      this.categoryService.delete(this.id);
      // this.router.navigate(['/admin/categories']);
      this.mdr.close();
      }
    });  
  }

  ngOnInit() {
  }

}
