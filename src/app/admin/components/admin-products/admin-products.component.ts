import { Product } from '../../../shared/models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from '../../../modules/angular-4-data-table';
import { DialogsService } from 'shared/services/dialogs.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number; 
  result: boolean;
  public loading = false;

  constructor(private productService: ProductService, private dialogsService: DialogsService) { 
    this.loading = true;
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
    this.loading = false;
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  filter(query: string) { 
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  delete(item: Product) {
    this.dialogsService
    .confirm('', 'Are you sure you want to delete this product?')
    .subscribe( res => {
      this.result = res;
      if (this.result)
      this.productService.delete(item.$key);
    });  
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
