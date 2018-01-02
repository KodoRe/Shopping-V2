import { ShopInfoService } from 'shared/services/shop-info.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AgmMap } from '@agm/core';


@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit {
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
      //Fixing manual inputting of gps latitude and longtitude by converting the input type from string to nubmer.
      //AGM-Map gets only numbers and not string!
      //I think, if we use the input type="number" it will convert it to number instead of string...
      //Converting to numbers.
      this.shop.location.lat = Number(this.shop.location.lat);
      this.shop.location.lng = Number(this.shop.location.lng);
      //Saving to the form as number before sending to db.
      this.form.get('location.lat').setValue(this.shop.location.lat);
      this.form.get('location.lng').setValue(this.shop.location.lng);

      this.shopinfoService.update(this.form.value);
      this.router.navigate(['/contact-us']); //done, navigate.
    }

  ngOnInit() {
  }

}
