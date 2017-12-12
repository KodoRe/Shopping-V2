import { AuthService } from '../../../../shared/services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'shared/services/contact.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact = {};
  id;
  userId = null;
  subscription: Subscription;

  constructor(
    private contactService: ContactService,
    private auth: AuthService
    ) {  
    this.subscription =  this.auth.user$.subscribe(u => {
      if (u)
        this.userId = u.uid;
    });
   }

  save(contact) {
    contact.datePlaced = new Date().getTime();
    contact.isHandled = false;
    if (this.userId)
    {
       contact.userId = this.userId;
    }
    this.contactService.create(contact);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
