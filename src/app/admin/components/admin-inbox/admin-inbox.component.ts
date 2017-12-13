import { ContactService } from 'shared/services/contact.service';
import { Contact } from 'shared/models/contact';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css']
})
export class AdminInboxComponent implements OnInit {
  requests: Contact[] = [];
  registered: Contact[] = [];
  registeredHandled: Contact[] = [];
  registeredNotHandled: Contact[] = [];
  anonymous : Contact[] = [];
  anonymousHandled: Contact[] = [];
  anonymousNotHandled: Contact[] = [];
  subscription: Subscription;

constructor(private contactService: ContactService) {
  this.contactService.getAll()
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

  ngOnInit() {
    
  }

}
