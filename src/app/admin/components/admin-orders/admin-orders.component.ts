import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) { 
    this.orders$ = orderService.getOrders();
  }
 
  markShipped(orderId) {
    if (!confirm('Are you sure you want to mark this order as shipped?')) return;    
    this.orderService.markShipped(orderId, new Date().getTime()); //When click on Mark as Shipped, it send the current date time.
  }
  
}
