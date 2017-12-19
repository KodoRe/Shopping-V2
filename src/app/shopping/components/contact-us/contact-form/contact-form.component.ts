import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'shared/services/contact.service';
import { MatDialog } from '@angular/material';
import { ContactSuccessComponent } from '../../contact-success/contact-success.component';


@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact = {name: "", email: "", phone: "", message: ""};
  userId = null; //if there is a userId, user is logged in..
  subscription: Subscription;

  constructor(
    private contactService: ContactService,
    private auth: AuthService,
    private dialog: MatDialog 
    ) {  
    this.subscription =  this.auth.user$.subscribe(u => {
      if (u)
      {
        this.userId = u.uid;
        this.contact.name = u.displayName;
        this.contact.email = u.email ? u.email : "";
      } 
      else
      {
        this.userId = null;     
      }
    });
   }

  save(contact) {
    contact.datePlaced = new Date().getTime();
    contact.isHandled = false;
    contact.adminName = '';
    if (this.userId)
    {
       contact.userId = this.userId;
    }
    this.contactService.create(contact);
  }

  clearForm(form: NgForm) {
    if(this.userId)
    {
      form.controls["message"].reset();
      form.controls["phone"].reset();
    }
    else
    {
      form.reset();
    }  
  }

  openDialog() {
    this.dialog.open(ContactSuccessComponent);  
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
