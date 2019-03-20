import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  get_products() {
    return this.httpClient.get(this.baseUrl + '/products');
  }

  get_product(id: number) {
    return this.httpClient.get(this.baseUrl + '/products/' + id);
  }

  add_product(product: Product): Observable<Product> {
    const url = `${this.baseUrl}`;
    return this.httpClient.post<Product>(url, product, httpOptions)
      .pipe(
        tap((product: Product) => console.log('added product')),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  update_product(id: number, product: Product): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, product, httpOptions)
    .pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  delete_product(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url, httpOptions)
    .pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  get_families() {
    return this.httpClient.get(this.baseUrl + '/families');
  }

  get_locations() {
    return this.httpClient.get(this.baseUrl + '/locations');
  }

  get_transactions() {
    return this.httpClient.get(this.baseUrl + '/transactions');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
