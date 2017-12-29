import { SurveyService } from '../../../shared/services/survey.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-abandoned-cart-survey',
  templateUrl: './abandoned-cart-survey.component.html',
  styleUrls: ['./abandoned-cart-survey.component.css']
})
export class AbandonedCartSurveyComponent implements OnInit {
  cartId: string = "-1";
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private surveyService: SurveyService
  ) {
    this.shoppingCartService.get(this.route.snapshot.paramMap.get('id')).subscribe(c => {
       if (c.userId)
        this.cartId = c.$key;
      else
        this.cartId = null;    
    });
  }

  submitSurvey(f) {
    this.surveyService.create(this.cartId, f.value);
    this.router.navigate(['survey-success']);
  }

  ngOnInit() {
  }

}
