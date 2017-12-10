import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  actualProducts;
  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }
  
  get(productId) { 
    return this.db.object('/products/' + productId);
  }

  update(productId, product) { 
    return this.db.object('/products/' + productId).update(product);
  }

  updateCategoryName(productId, newCategoryName) {
    return this.db.object('/products/' + productId).update({category: newCategoryName});
  }

  delete(productId) { 
    return this.db.object('/products/' + productId).remove();
  }

  renameProductsWithOldCategoryNameToNewName(oldName, newName) {
    let subscribe = this.db.list('/products', 
    {
      query: {
        orderByChild: 'category',
        equalTo: oldName
      }
    }).subscribe(p => {
      p.forEach(product => {
        //console.log(product);  //with this on, i seen the memory leak in the console.
        this.updateCategoryName(product.$key, newName);
      });
      subscribe.unsubscribe(); //important to unsubscribe to prevent memory leak..
    });
  }

}
