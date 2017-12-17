import { Component, OnInit } from '@angular/core';
import { Contact } from 'shared/models/contact';
import { Observable, Subscription } from 'rxjs';
import { DataTableResource } from 'angular-4-data-table';
import { AuthService } from 'shared/services/auth.service';
import { ContactService } from 'shared/services/contact.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {
  messages: Observable<any>[];
  subscription: Subscription;
  tableResource: DataTableResource<Contact>;
  items: Contact[] = [];
  itemCount: number; 

  
  constructor(
    private authService: AuthService,
    private contactService: ContactService) {
       authService.user$.take(1).subscribe(u => {
         // possible memory leak need to check if unsubscribe is needed after using take(1)
        this.subscription = this.contactService.getMessagesByUser(u.uid)
        .subscribe(messages => {
          this.messages = messages;
          this.initializeTable(messages);
        });
       }); 
  }


  private initializeTable(messages: Contact[]) {
    this.tableResource = new DataTableResource(messages);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }


  ngOnInit() {
  }

}
