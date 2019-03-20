import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DataService } from './data.service';
import { Product } from './product.model';
import { IProduct } from './product';
import { IFamily } from './family';
import { ILocation } from './location';
import { ITransaction } from './transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public products: Product[] = [];
  public product = new Product(0, "", "");
  public families: IFamily[] = [];
  public locations: ILocation[] = [];
  public transactions: ITransaction[] = [];

  //productForm: FormGroup;

  categories: string[] = ["Tools", "Paint", "Books", "Travel", "Toys", "Home", "Music", "Sport", "Baby", "Business", "Games"];

  public productsObservable: Observable<IProduct[]>;

  constructor(private dataService: DataService) {

    //this.productsObservable = this.dataService.get_products();

    this.dataService.get_products().subscribe((res: Product[]) => {
      this.products = res;
    });

    /*
    this.dataService.get_families().subscribe((res: Family[]) => {
      this.families = res;
    });

    this.dataService.get_locations().subscribe((res: Location[]) => {
      this.locations = res;
    });

    this.dataService.get_transactions().subscribe((res: Transaction[]) => {
      this.transactions = res;
    });
    */

  }

  /*
  buildForm() {
    this.productForm = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }
  */
  /*
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
  */

  onEdit(id: number) {
    this.dataService.get_product(id).subscribe((res: Product) => {
      this.product = res;
    });
  }

  onAdd() {
    this.product.id = this.products.length + 1;
    this.products.push(new Product(this.product.id, this.product.name, this.product.category));
  }

  onCancel() {
    this.product = new Product(0, "", "");
  }

  onUpdate(product: Product) {
    for (let prd of this.products) {
      if (prd.id === product.id) {
        prd.name = product.name;
        prd.category = product.category;
      }
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      for (let i = 0; i < this.products.length; ++i) {
        if (this.products[i].id === id) {
          this.products.splice(i, 1);
        }
      }
    }
  }

  /*
  checkValid() {
    if(this.productForm.get('name').valid || this.productForm.get('category').valid || this.productForm.get('email').valid) {
      return false;
    } else {
      return true;
    }
  }
  */

}
