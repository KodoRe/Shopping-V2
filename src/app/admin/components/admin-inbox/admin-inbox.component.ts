import { ConfirmDialogService } from 'shared/services/confirm-dialog.service';
import { UserService } from 'shared/services/user.service';
import { ContactService } from 'shared/services/contact.service';
import { Contact } from 'shared/models/contact';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operator/map';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { expandCollapse, slideOut, fadeInOut } from './admin-inbox.component.animations';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'shared/components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css'],
  animations: [ expandCollapse , slideOut, fadeInOut ]
})
export class AdminInboxComponent implements OnInit, OnDestroy {
  request: Contact;
  requests: Contact[] = [];
  registered: Contact[] = [];
  registeredHandled: Contact[] = [];
  registeredHandledFiltered: Contact[] = [];  
  registeredNotHandled: Contact[] = [];
  registeredNotHandledFiltered: Contact[] = [];
  anonymous : Contact[] = [];
  anonymousHandled: Contact[] = [];
  anonymousHandledFiltered: Contact[] = [];
  anonymousNotHandled: Contact[] = [];
  anonymousNotHandledFiltered: Contact[] = [];
  subscription: Subscription;
  appUser: AppUser;
  rhExpanded: boolean;
  rnhExpanded: boolean;
  ahExpanded: boolean;
  anhExpanded: boolean;



constructor(private contactService: ContactService, private auth: AuthService, private dialog: MatDialog, private confirmDialogService: ConfirmDialogService) {
  this.subscription = this.contactService.getAll()
  .subscribe(r => {
    this.requests = r.reverse(); //Did a trick, for desc ordering ;)
    this.registered = [];
    this.registeredHandled = [];
    this.registeredHandledFiltered = [];
    this.registeredNotHandled = [];
    this.registeredNotHandledFiltered = [];
    this.anonymous = [];
    this.anonymousHandled = [];
    this.anonymousHandledFiltered = [];
    this.anonymousNotHandled = [];
    this.anonymousNotHandledFiltered = [];
    this.populateLists();
    this.subscription.unsubscribe();
  });
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
      //initialize filtered arrays.
      this.registeredHandledFiltered = this.registeredHandled;
      this.registeredNotHandledFiltered = this.registeredNotHandled;

    //Break down to Handled and Not Handled Messages for Annonymous Users
    this.anonymous.forEach( r => {
      if(r.isHandled)
      {
        this.anonymousHandled.push(r);
      }
      else 
      {
        this.anonymousNotHandled.push(r);
      }
      //initialize filtered arrays.
      this.anonymousHandledFiltered = this.anonymousHandled;
      this.anonymousNotHandledFiltered = this.anonymousNotHandled;

    });    
  }

  filter(query: string, messageBox: string) { 
    console.log(messageBox);
    switch(messageBox) {
      case 'registeredHandled':
      this.registeredHandledFiltered = this.registeredHandled.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));
      break;
      case 'registeredNotHandled':
      this.registeredNotHandledFiltered = this.registeredNotHandled.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));
      break;
      case 'anonymousHandled':
      this.anonymousHandledFiltered = this.anonymousHandled.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));
      break;
      case 'anonymousNotHandled':
      this.anonymousNotHandledFiltered = this.anonymousNotHandled.filter(o => o.name.toLowerCase().includes(query.toLowerCase()));
      break;
    }
  }

  markAsDone(request: Contact, messageBox: string) {
  this.openDialog();
  if (!this.confirmDialogService.dialogConfirm()) return;        
  this.request = request;
  this.request.isHandled = true;
  this.request.adminName = this.appUser.name;
  this.contactService.update(this.request.$key, this.request);
  let msgIndex;
  switch(messageBox)
  {
    case "annonymousNotHandled":
        msgIndex = this.anonymousNotHandled.indexOf(request);         
        this.anonymousNotHandled.splice(msgIndex, 1);                     
        this.anonymousHandled.unshift(request);
    break;
    case "registeredNotHandled":
        msgIndex = this.registeredNotHandled.indexOf(request);         
        this.registeredNotHandled.splice(msgIndex, 1);                     
        this.registeredHandled.unshift(request);  
    break;
  }
}

openDialog() {
  this.dialog.open(ConfirmDialogComponent, {
    data: {
          title:"Confirm",
          message:"Are you sure you want to mark this message as handled?"
        }
      });
}

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
