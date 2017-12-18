import { AuthService } from 'shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from '../../../modules/angular-4-data-table';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: Observable<any>[];
  subscription: Subscription;
  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number; 

  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
       authService.user$.take(1).subscribe(u => {
         // possible memory leak need to check if unsubscribe is needed after using take(1)
        this.subscription = this.orderService.getOrdersByUser(u.uid)
        .subscribe(orders => {
          this.orders = orders;
          this.initializeTable(orders);
        });
       }); 
  }


  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource(orders);
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


}
