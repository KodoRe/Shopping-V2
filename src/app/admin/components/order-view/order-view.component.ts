import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderView } from '../../../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit{ 
  order$: Observable<OrderView>;
  id;

  constructor(
              private OrderService: OrderService,
              private router: Router, 
              private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id'); 
    console.log(this.id);  
  }
  
  async ngOnInit() { 
    this.order$ = await this.OrderService.getOrderDetailsByOrderId(this.id).take(1).map(o => new OrderView(o.datePlaced, o.items, o.shipping));

    };
}
