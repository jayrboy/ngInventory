import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Transaction from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/Transaction';

  getTransactions() {
    return this.http.get<Transaction[]>(`${this.baseURL}`);
  }

  getTransaction(id: number | string) {
    return this.http.get<Transaction>(`${this.baseURL}/${id}`);
  }

  post(transaction: Transaction) {
    return this.http.post<Transaction>(`${this.baseURL}`, transaction);
  }

  put(transaction: Transaction) {
    return this.http.put<Transaction>(`${this.baseURL}`, transaction);
  }

  delete(id: number | string) {
    return this.http.delete<Transaction>(`${this.baseURL}/${id}`);
  }

  getTransactionByPage(id: number | string) {
    return this.http.get<Transaction[]>(`${this.baseURL}/page/${id}`);
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
