import { ContactFormComponent } from './contact-form/contact-form.component';
import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  lat: number = 32.342286;
  lng: number = 34.912262;
  zoom: number = 14;
  
  constructor() {   }
  ngOnInit() {
  }

}
