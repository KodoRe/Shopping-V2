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
  id;
  userId = null;
  subscription: Subscription;
  form: NgForm;

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
    this.clearForm();
  }
clearForm() {
  let form = this.contact;
   form.phone = ''
   form.message = '';
  // if(!this.auth.user$)
  // {
  // form.phone = ''
  // form.message = '';
  // }
  // else 
  // {
  //   form.name = ''
  //   form.email = '';
  //   form.phone = ''
  //   form.message = '';
  // }
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
