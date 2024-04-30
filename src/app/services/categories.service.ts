import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Categories from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/Category';

  getCategories() {
    return this.http.get<Categories[]>(`${this.baseURL}`);
  }

  getCategoriesById(id: number | string) {
    return this.http.get<Categories>(`${this.baseURL}/${id}`);
  }

  post(categories: Categories) {
    return this.http.post<Categories>(`${this.baseURL}`, categories);
  }

  put(categories: Categories) {
    return this.http.put<Categories>(`${this.baseURL}`, categories);
  }

  delete(id: number | string) {
    return this.http.delete<Categories>(`${this.baseURL}/${id}`);
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
