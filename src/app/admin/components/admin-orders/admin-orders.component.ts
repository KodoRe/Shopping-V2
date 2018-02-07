import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { UserService } from '../../../shared/services/user.service';
import { Order, OrderView } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from '../../../modules/angular-4-data-table';
import { DialogsService } from 'shared/services/dialogs.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscription: Subscription;
  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number; 
  userName;
  result: boolean;
  public loading = false;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private dialogsService: DialogsService
  ) { 
    this.loading = true;
    this.subscription = this.orderService.getOrders()
    .subscribe(orders => {
      this.orders = orders;   
      for(let i = 0; i < this.orders.length; i++)
      {
        let subscribtion = this.userService.get(this.orders[i].userId).subscribe(u => {
          this.orders[i].userName = u.name;
          subscribtion.unsubscribe();
        });
      }
      this.initializeTable(orders);
    });
  }
  
  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource(orders);
    this.tableResource.query({ offset: 0 })
      .then(items => {
        this.items = items
      });
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
    let filteredOrders = (query) ?
      this.orders.filter(o => o.userName.toLowerCase().includes(query.toLowerCase())) :
      this.orders;

    this.initializeTable(filteredOrders);
  }

  markShipped(orderId) {
    this.dialogsService
    .confirm('', 'Are you sure you mark this as shipped?')
    .subscribe( res => {
      this.result = res;
      if (this.result)
      this.orderService.markShipped(orderId, new Date().getTime()); //When click on Mark as Shipped, it send the current date time.
    });    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }
}
