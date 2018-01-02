import { ngSelectLocation } from '../location/browser-location';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderView } from '../../../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit{ 
  appUser: AppUser;
  order$: Observable<OrderView>;
  orderId;

  constructor(
              private orderService: OrderService,
              private auth: AuthService,
              private router: Router, 
              private route: ActivatedRoute
  ) {
    this.orderId = this.route.snapshot.paramMap.get('id'); 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
  }
  
  async ngOnInit() { 
    this.loadOrder();
  };
  
  async loadOrder() {
    this.order$ = await this.orderService.getOrderDetailsByOrderId(this.orderId).take(1).map(o => new OrderView(o));    
  }
  markShipped(orderId) {
    if (!confirm('Are you sure you want to mark this order as shipped?')) return;    
    this.orderService.markShipped(orderId, new Date().getTime()); //When click on Mark as Shipped, it send the current date time.
    this.loadOrder();
  }
}
