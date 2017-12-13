import { ContactService } from 'shared/services/contact.service';
import { Contact } from 'shared/models/contact';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { forEach } from '@angular/router/src/utils/collection';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css']
})
export class AdminInboxComponent implements OnInit {
  requests: Contact[] = [];
  registered: Contact[] = [];
  anonymous : Contact[] = [];
  subscription: Subscription;

constructor(private contactService: ContactService) {
  this.contactService.getAll()
  .subscribe(r => {
    this.requests = r;
    this.populateLists();
  })
}

  populateLists() { 
    this.requests.forEach( item => {
      if(!!item.userId)
      {
        this.registered.push(item);
      }
      else
      {
      this.anonymous.push(item);
      }
    })
  }
  ngOnInit() {
  }

}
