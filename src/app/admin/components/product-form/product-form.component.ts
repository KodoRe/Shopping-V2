import { Category } from './../../../shared/models/category';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/take'; 
import { FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import { Product } from 'shared/models/product';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories$;
  product = {images: []};
  imageLink = "";
  @ViewChild(ProductCardComponent) pcc: ProductCardComponent; //Used to trigger function on child element (refreshCarousel)
  id;

  constructor(
    fb: FormBuilder,
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {
      this.categories$ = categoryService.getAll();
      this.form = fb.group({
        title: ['',Validators.required],
        description: ['',Validators.required],
        price: ['',Validators.required],
        category: ['',Validators.required],
        imageUrl: ['', Validators.pattern("https?://.+")],
        images: fb.array([], Validators.required),
      })
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(
      p => {
        this.product = p;
        this.product.images.forEach(image => {
            this.images.push(new FormControl(image));
          });
        }
      );
    }      
  }


  save() { 
    this.form.removeControl("imageUrl"); //imageUrl is only used in the form, but don't needed in firebase database. so i remove the control.
    if (this.id) this.productService.update(this.id, this.form.value);
    else this.productService.create(this.form.value);
    this.form.addControl("imageUrl", new FormControl('', Validators.pattern("https?://.+"))); //To prevent the not found in console (because the removal of the control)
    this.router.navigate(['/admin/products']); //done, navigate.
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get price() {
    return this.form.get('price');
  }

  get category() {
    return this.form.get('category');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get images() {
    return this.form.get('images') as FormArray;
  }

  addToImages(image: HTMLInputElement) {
    if (image.value != '')
    {
    this.images.push(new FormControl(image.value));
    this.product.images.push(image.value);          
    this.imageLink = "";
    this.pcc.refreshCarousel();
    }
  }

  removeImage(image: FormControl) {
    let index = this.images.controls.indexOf(image);
    this.images.removeAt(index);
    this.product.images.splice(index, 1);
    this.pcc.refreshCarousel();
  }

  ngOnInit() {
    
  }
}
