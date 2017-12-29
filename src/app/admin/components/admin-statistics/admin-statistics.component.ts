import { Subscription } from 'rxjs/Rx';
import { UserService } from '../../../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminStatisticsService } from 'app/admin/services/admin-statistics.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { forEach } from '@angular/router/src/utils/collection';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductService } from 'shared/services/product.service';
import { SurveyService } from 'shared/services/survey.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit, OnDestroy {
  //Abandoned Carts
  abandonedCarts: any[] = [];
  //Shop Statistics
  registeredUsersAbandonedCarts: number = 0;
  totalAnonymousCarts: number = 0;
  totalRegisterdedCarts: number = 0;
  totalItemsSoldInShop: number = 0;
  potentialBuyersOneHour: number = 0;
  totalMoneyEarned: number = 0;
  top5items: any[] = [];
  //Survey Statistics
  totalSurveys: number;
  highPrice: {yes: 0, no: 0}; 
  missingItems: {yes: 0, no: 0};
  notShipping: {yes: 0, no: 0};
  //Subscriptions
  ordersSubscription: Subscription; //general subscription when something changes in firebase > orders
  registeredUsersCartsSubscription: Subscription; //general subscription when something changes in firebase > registered users shopping-carts
  surveysSubscription: Subscription; //general subscription when something changes in firebase > surveys

  constructor(
    private statisticsService: AdminStatisticsService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private surveyService: SurveyService,
    private userService: UserService
      ){
      //Statistics of shopping carts
       this.registeredUsersCartsSubscription = statisticsService.getShoppingCarts().subscribe(c =>  
      {
        this.abandonedCarts = [];
        this.registeredUsersAbandonedCarts = 0;
        this.totalAnonymousCarts = 0;
        this.totalRegisterdedCarts = 0;
        this.potentialBuyersOneHour = 0;

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
              let userSubscription = this.userService.get(c.userId).subscribe(u => {
                c.userName  = u.name;
                userSubscription.unsubscribe();
              });
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

          //Potential Buyers In the next 1 hour:
          if (c.lastActionDate) {
          let milliSecondsPastBetweenTodayAndLastActionDate = (Date.now() - c.lastActionDate);
          let hoursPastLastActionDate = Math.floor(milliSecondsPastBetweenTodayAndLastActionDate/1000/3600);  

          if (hoursPastLastActionDate > 1) //More then one hour past, don't count it as potential buyer for the next 1 hour.
            return;
          }
          else {
            return;
          }

          if (c.items)
          {
            this.potentialBuyersOneHour++;
          }
        });
      });
    
    //Statistics of orders
    let hotItems: any;
    this.ordersSubscription = this.statisticsService.getOrders().subscribe(o => {      
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
          }            
        }
      })

      //transform hotItems object into sortable array to so i know which item sold the most, at place [0], [1] ..., take their id and ask for their name.
      let hotItemsSortable = [];
      this.top5items = []; //reset in case of re-enter the function by the subscription (like all the above resets)
      
      for (let item in hotItems) {
        let productSubscription = this.productService.get(item).subscribe(p => {
             hotItemsSortable.push([p.title, hotItems[item].quantity, hotItems[item].imgUrl]);
          this.top5items = hotItemsSortable.slice(0,5);
          hotItemsSortable.sort(function(a, b) {
            //for sort like : 16 15 14 13:
            return  b[1] - a[1];
            //for sort like: 13 14 15 16:
            //return a[1] - b[1];
        });
        productSubscription.unsubscribe();
       })
      }      
    })

    //Statistics of survey
    this.totalSurveys = 0;
    this.highPrice = {yes: 0, no: 0};
    this.missingItems = {yes: 0, no: 0};
    this.notShipping = {yes: 0, no: 0};
    
    this.surveysSubscription = this.surveyService.getSurveys().subscribe(s => {    
      this.totalSurveys = 0;
      this.highPrice = {yes: 0, no: 0};
      this.missingItems = {yes: 0, no: 0};
      this.notShipping = {yes: 0, no: 0};

      s.forEach(s => {
        this.totalSurveys++;
        //High Price
        if (s.survey.highPrice == 0)
          this.highPrice.no++;
        else
          this.highPrice.yes++;
          
          //Missing Items in shop
          if (s.survey.missingItems == 0)
          this.missingItems.no++;
        else
          this.missingItems.yes++;

          //Shop not do shippings
          if (s.survey.notShipping == 0)
          this.notShipping.no++;
        else
          this.notShipping.yes++;
      })
    });
  }

  sendMail(userId: string, cartId: string)
  {
    this.shoppingCartService.sendMail(userId, cartId);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.registeredUsersCartsSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
    this.surveysSubscription.unsubscribe();
  }

}