import { FormArray } from '@angular/forms';

export interface Product {
  $key: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: Array<string>;
} 