import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  create(contact) { 
    return this.db.list('/contacts').push(contact);
  }

  getAll() { 
    return this.db.list('/contacts');
  }

  get(contactId) {
    return this.db.object('/contacts/' + contactId);    
  }
  
  update(contactId, contact) { 
    return this.db.object('/products/' + contactId).update(contact);
  }
}
