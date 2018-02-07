import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderView } from '../../../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { DialogsService } from 'shared/services/dialogs.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit{ 
  appUser: AppUser;
  order$: Observable<OrderView>;
  orderId;
  result: boolean;
  public loading = false;

  constructor(
              private orderService: OrderService,
              private auth: AuthService,
              private router: Router, 
              private route: ActivatedRoute,
              private dialogsService: DialogsService
  ) {
    this.loading = true;
    this.orderId = this.route.snapshot.paramMap.get('id'); 
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser
      this.loading = false;
    });
  }
  
  async ngOnInit() { 
    this.loadOrder();
  };
  
  async loadOrder() {
    this.order$ = await this.orderService.getOrderDetailsByOrderId(this.orderId).take(1).map(o => new OrderView(o));    
    
  }
  markShipped(orderId) {
    this.dialogsService
    .confirm('', 'Are you sure you want to mark this as shipped?')
    .subscribe( res => {
      this.result = res;
      if (this.result)
      {
      this.orderService.markShipped(orderId, new Date().getTime()); //When click on Mark as Shipped, it send the current date time.
      this.loadOrder();
      }
    });    
  }
}
