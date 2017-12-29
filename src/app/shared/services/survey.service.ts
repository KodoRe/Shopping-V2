import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class SurveyService {

  constructor(
    private db: AngularFireDatabase,    
  ) { 

  }

  create(cartId, survey) { 
    return this.db.object('/surveys/' + cartId).update({
      lastTimeModified: new Date().getTime(),
      cartId: cartId,
      survey: survey  
    });
  }

  getSurveys() {
    return this.db.list('/surveys');
  }

}
