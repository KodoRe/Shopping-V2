import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase'; 
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.user$ = afAuth.authState;   
  }

  login(provider: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')  || window.location.pathname || '/';
    localStorage.setItem('returnUrl', returnUrl);

    switch (provider)
    {
      case "google":
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => {
        let subscription = this.user$.subscribe(user => {  this.shoppingCartService.setCartUserId(user.uid); this.shoppingCartService.removeOldCarts(user.uid); subscription.unsubscribe();  })
        this.router.navigate([returnUrl]);      
      });  
       break;
      case "facebook":
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(r => {
        let subscription = this.user$.subscribe(user => {  this.shoppingCartService.setCartUserId(user.uid); this.shoppingCartService.removeOldCarts(user.uid); subscription.unsubscribe();  })        
        this.router.navigate([returnUrl]);      
      });  
        break;
      case "twitter":
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(r => {
        let subscription = this.user$.subscribe(user => { this.shoppingCartService.setCartUserId(user.uid); this.shoppingCartService.removeOldCarts(user.uid); subscription.unsubscribe();  })        
        this.router.navigate([returnUrl]);      
      });  
        break;
    }
  }

  logout() { 
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }
}
