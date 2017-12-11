import { Component, OnInit } from '@angular/core';
import { ContactService } from 'shared/services/contact.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact = {};
  id;

  constructor(private contactService: ContactService) {   }

  save(contact) {
    contact.datePlaced = new Date().getTime();
    contact.isHandled = false;
    this.contactService.create(contact);
  }
  ngOnInit() {
  }

}
