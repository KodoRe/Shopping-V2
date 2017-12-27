import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCart } from './shopping-cart';

export class Order { 
  datePlaced: number; 
  items: any[];
  userName: string;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
        key: i.$key,
        product: {
          title: i.title,
          images: i.images,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }
     
    get totalItemsCount() {
      let count = 0;
      for (let productId in this.items) 
      {
        count += this.items[productId].quantity;
      }
      return count;
    }
  }

  export class OrderView { 
    datePlaced: number; 
    dateShipped: number;
    items: any[];
    shipping: any[];

    constructor(order) {
      this.datePlaced = order.datePlaced;
      this.dateShipped = order.dateShipped;
      this.items = order.items.map(i => {
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
      this.shipping = order.shipping;
    }
       
      get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) 
        {
          count += this.items[productId].quantity;
        }
        return count;
      }

      get totalPrice() {
        let sum = 0;
        for (let productId in this.items) 
          sum += this.items[productId].totalPrice;
        return sum;
      }
    }