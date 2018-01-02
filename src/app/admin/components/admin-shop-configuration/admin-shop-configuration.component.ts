import { ShopInfoService } from 'shared/services/shop-info.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AgmMap } from '@agm/core';


@Component({
  selector: 'app-admin-shop-configuration',
  templateUrl: './admin-shop-configuration.component.html',
  styleUrls: ['./admin-shop-configuration.component.css']
})
export class AdminShopConfigurationComponent implements OnInit {
  form: FormGroup;
  lat: number;
  lng: number;
  shop = { name: "", address: "",  email: "", phone: "", fax: "", workHours: "" , location: {lat: 0, lng: 0, zoom: 14} };

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private shopinfoService: ShopInfoService
  ) {

      this.form = fb.group({
        name: ['',Validators.required],
        address: ['',Validators.required],
        email: ['',Validators.required],
        phone: ['',Validators.required],
        workHours: ['',Validators.required],
        fax: ['', Validators.required],
        location: fb.group({
          lat: [''],
          lng: [''],
          zoom: ['']
        })
      })

   this.shopinfoService.get().subscribe(shop => this.shop = shop);
  }

  placeMarker($event){
    this.shop.location.lat = $event.coords.lat;
    this.shop.location.lng = $event.coords.lng;
  }

  zoomChange($event){
    this.shop.location.zoom = $event;
  }

  get name() {
    return this.form.get('name');
  }
    get address() {
      return this.form.get('address');
    }

    get email() {
      return this.form.get('email');
    }

    get phone() {
      return this.form.get('phone');
    }

    get fax() {
      return this.form.get('fax');
    }
    get workHours() {
      return this.form.get('workHours');
    }

    save() {
      this.shopinfoService.update(this.form.value);
      this.router.navigate(['/contact-us']); //done, navigate.
    }

  ngOnInit() {
  }

}
