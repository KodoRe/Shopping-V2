import { ContactFormComponent } from './contact-form/contact-form.component';
import { ShopInfoService } from 'shared/services/shop-info.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  shop = { name: "", address: "",  email: "", phone: "", fax: "", workHours: "" , location: { lat: 0, lng: 0, zoom: 14 } };
  public loading = false;
  subscription: Subscription;

  constructor(private shopinfoService: ShopInfoService) {
    this.loading = true;
    this.subscription = this.shopinfoService.get().subscribe(shop => {
      this.shop = shop
      this.loading = false;
    });
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
