import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/category';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { MatDialog } from '@angular/material';
import { CategoryFormComponent } from './../../components/admin-categories/category-form/category-form.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  categories: Category[];
  subscription: Subscription;
  tableResource: DataTableResource<Category>;
  items: Category[] = [];
  itemCount: number; 

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog   
  ) { 
    this.subscription = this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
        this.initializeTable(categories);
      });
  }

  private initializeTable(categories: Category[]) {
    this.tableResource = new DataTableResource(categories);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  filter(query: string) { 
    let filteredCategories = (query) ?
      this.categories.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.categories;

    this.initializeTable(filteredCategories);
  }

  openDialog(namereplace, key) {
    this.dialog.open(CategoryFormComponent, {
      data: {
        catKey: key,
        nameToReplace: namereplace
      }
    });
  }

  delete(item: Category) {

    if (!confirm('Are you sure you want to delete this category?')) return;    
    this.categoryService.delete(item.$key);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}

