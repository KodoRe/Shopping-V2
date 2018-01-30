import { AppUser } from '../models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): FirebaseObjectObservable<AppUser> { 
    return this.db.object('/users/' + uid);
  }

  getAll() {
    return this.db.list('/users/');
  }

  setShippingInfo(uid: string, shippingInfo: any) {
    return this.db.object('/users/' + uid).update({shipping: shippingInfo});
  }

  toggleAdmin(uid: string, admin: boolean) {
    return this.db.object('/users/' + uid).update({isAdmin: admin});
  }
}
