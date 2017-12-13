import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  create(contact) { 
    return this.db.list('/messages').push(contact);
  }

  getAll() { 
    return this.db.list('/messages');
  }

  get(contactId) {
    return this.db.object('/messages/' + contactId);    
  }
  
  update(contactId, contact) { 
    return this.db.object('/messages/' + contactId).update(contact);
  }

  getRegisteredMessage() {
    return this.db.list('/messages', {
      query: {
        orderByChild: 'userId' 
      }
    });
  }
}
