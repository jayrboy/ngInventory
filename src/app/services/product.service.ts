import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Product from '../models/product.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/Product';

  getProducts() {
    return this.http.get<Response>(`${this.baseURL}`);
  }

  getProduct(id: number | string) {
    return this.http.get<Response>(`${this.baseURL}/${id}`);
  }

  post(product: Product) {
    return this.http.post<Product>(`${this.baseURL}`, product);
  }

  put(product: Product) {
    return this.http.put<Product>(`${this.baseURL}`, product);
  }

  delete(id: number | string) {
    return this.http.delete<Product>(`${this.baseURL}/${id}`);
  }

  updateQuantity(object: any) {
    return this.http.put<Product>(`${this.baseURL}/UpdateQuantity`, object);
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
