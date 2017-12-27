import { Component, OnInit } from '@angular/core';
import { AdminStatisticsService } from 'app/admin/services/admin-statistics.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { forEach } from '@angular/router/src/utils/collection';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
  abandonedCarts: any[] = [];
  registeredUsersAbandonedCarts: number = 0;
  totalAnonymousCarts: number = 0;
  totalRegisterdedCarts: number = 0;
  totalItemsSoldInShop: number = 0;
  totalMoneyEarned: number = 0;
  top5items: any[] = [];

  constructor(
    private statisticsService: AdminStatisticsService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService
      ){
      //Statistics of shopping carts
       statisticsService.getRegisteredUsersCarts().subscribe(c => 
      {
        this.abandonedCarts = [];
        this.registeredUsersAbandonedCarts = 0;
        this.totalAnonymousCarts = 0;
        this.totalRegisterdedCarts = 0;
        
        c.forEach(c => { 
          //Registered Users Abandoned Carts Emails + Abandoned Carts Count Logic:
         if (c.userId)
         {
          if(c.items) //If there is no items, this is not abandoned carts for me (items got deleted after checkout)
          {

            let milliSecondsPastBetweenTodayAndLastActionDate = (Date.now() - c.lastActionDate);
            let hoursPastLastActionDate = Math.floor(milliSecondsPastBetweenTodayAndLastActionDate/1000/3600);            
            
            if (c.emailSentDate) //Anti-SPAM, send email once in 2 weeks.
            {
              let milliSecondsPastBetweenTodayAndEmailSent = (Date.now() - c.emailSentDate);   
              let hoursPastEmailSent = Math.floor(milliSecondsPastBetweenTodayAndEmailSent/1000/3600);
              if (hoursPastEmailSent < 336) //If email already sent, and didn't pass 2 weeks, dont show.
                return;
            }

            if(hoursPastLastActionDate <= 48) //Less then 2 days past before last action, its ok for now, dont show.
              return;
            
              let totalQuantity = 0;
              for (let item in c.items)
              {
                totalQuantity += c.items[item].quantity;
              }
              this.registeredUsersAbandonedCarts++;
              c.totalQuantity = totalQuantity;
              this.abandonedCarts.push(c);  
          }
         }
        })
        
        //Other Statistics
        c.forEach(c => { 
          //Total Carts:
          if (c.userId)
            this.totalRegisterdedCarts++;
          else
            this.totalAnonymousCarts++;
        });
        //UNSUBSCRIBE? <<<<<<<<<<<<<<<<<<
      });
    
    //Statistics of orders
    let hotItems: any;
    this.statisticsService.getOrders().subscribe(o => {
      hotItems = {};
      //Total Price and Items Sold from Orders and not shopping carts.
      this.totalItemsSoldInShop = 0;
      this.totalMoneyEarned = 0;
      o.forEach(o => {
        for (let item in o.items)
        {
          //Total shop items sold and money earned
          this.totalItemsSoldInShop += o.items[item].quantity;
          this.totalMoneyEarned += o.items[item].totalPrice;

          //Shop Most Selled Items (Top Items, setted for 5)
          if (hotItems[o.items[item].key]){
            hotItems[o.items[item].key].quantity +=  o.items[item].quantity;                 
          }
          else
          {
            hotItems[o.items[item].key] = { quantity: o.items[item].quantity , imgUrl: o.items[item].product.images[0] };
            console.log(hotItems[o.items[item].key]);                  
          }            
        }
      })

      //transform hotItems object into sortable array to so i know which item sold the most, at place [0], [1] ..., take their id and ask for their name.
      let hotItemsSortable = [];
      for (let item in hotItems) {
          hotItemsSortable.push([item, hotItems[item].quantity, hotItems[item].imgUrl]);
      }

      hotItemsSortable.sort(function(a, b) {
          //for sort like : 16 15 14 13:
          return  b[1] - a[1];
          //for sort like: 13 14 15 16:
          //return a[1] - b[1];
      });
      
      //Transforming keys to products names
      for (let i = 0; i < hotItemsSortable.length; i++) 
      {
          this.productService.get(hotItemsSortable[i][0]).subscribe(p => {
            hotItemsSortable[i][0] = p.title;
            //unsubscribe??
         })
      }

      //Getting top 5 hottest items.
      this.top5items = []; //reset in case of re-enter the function by the subscription (like all the above resets)
      this.top5items = hotItemsSortable.slice(0,5);
        //UNSUBSCRIBE? <<<<<<<<<<<<
    })
  }

  sendMail(userId: string)
  {
    //Implement survey.. <<<<<<<<<<<<<<<<<
    this.shoppingCartService.sendMail(userId);
  }
  ngOnInit() {

  }

}