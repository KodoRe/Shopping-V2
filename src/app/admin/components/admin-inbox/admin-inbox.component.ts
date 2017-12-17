import { UserService } from 'shared/services/user.service';
import { ContactService } from 'shared/services/contact.service';
import { Contact } from 'shared/models/contact';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operator/map';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { expandCollapse, slideOut } from './admin-inbox.component.animations';



@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css'],
  animations: [ expandCollapse , slideOut ]
})
export class AdminInboxComponent implements OnInit, OnDestroy {
  request: Contact;
  requests: Contact[] = [];
  registered: Contact[] = [];
  registeredHandled: Contact[] = [];
  registeredNotHandled: Contact[] = [];
  anonymous : Contact[] = [];
  anonymousHandled: Contact[] = [];
  anonymousNotHandled: Contact[] = [];
  subscription: Subscription;
  appUser: AppUser;
  rhExpanded: boolean;
  rnhExpanded: boolean;
  ahExpanded: boolean;
  anhExpanded: boolean;



constructor(private contactService: ContactService, private auth: AuthService,) {
  this.subscription = this.contactService.getAll()
  .subscribe(r => {
    this.requests = r.reverse(); //Did a trick, for desc ordering ;)
    this.registered = [];
    this.registeredHandled = [];
    this.registeredNotHandled = [];
    this.anonymous = [];
    this.anonymousHandled = [];
    this.anonymousNotHandled = [];
    this.populateLists();
  })
  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

}

  rhToggle() {
  this.rhExpanded =!this.rhExpanded;
  }

  rnhToggle() {
    this.rnhExpanded =!this.rnhExpanded;
  }

  ahToggle() {
    this.ahExpanded =!this.ahExpanded;
  }

  anhToggle() {
    this.anhExpanded =!this.anhExpanded;
  }

  populateLists() { 
    //Break down to Registered and Annonymous Messages
    this.requests.forEach( r => {
      if(!!r.userId)
      {
        this.registered.push(r);
      }
      else
      {
      this.anonymous.push(r);
      }
    });

    //Break down to Handled and Not Handled Messages for Registered Users
    this.registered.forEach( r => {
        if(r.isHandled)
        {
          this.registeredHandled.push(r);
        }
        else 
        {
          this.registeredNotHandled.push(r);
        }
      });

    //Break down to Handled and Not Handled Messages for Registered Users
    this.anonymous.forEach( r => {
      if(r.isHandled)
      {
        this.anonymousHandled.push(r);
      }
      else 
      {
        this.anonymousNotHandled.push(r);
      }
    });
  }

  markAsDone(request) {
  this.request = request;
  this.request.isHandled = true;
  this.request.adminName = this.appUser.name;
  this.contactService.update(this.request.$key, this.request);
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
