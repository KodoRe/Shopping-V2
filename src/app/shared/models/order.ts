import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCart } from './shopping-cart';

export class Order { 
  datePlaced: number; 
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
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
    items: any[];
    shipping: any[];

    constructor(datePlaced: number, items: any, shipping: any) {
      this.datePlaced = datePlaced;
      this.items = items.map(i => {
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
      this.shipping = shipping;
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