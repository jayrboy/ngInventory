import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import TransactionTypes from '../models/transaction-types.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypesService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/TransactionType';

  getTransactionTypes() {
    return this.http.get<TransactionTypes[]>(`${this.baseURL}`);
  }

  getTransactionTypesById(id: number | string) {
    return this.http.get<TransactionTypes>(`${this.baseURL}/${id}`);
  }

  post(transactionTypes: TransactionTypes) {
    return this.http.post<TransactionTypes>(
      `${this.baseURL}`,
      transactionTypes
    );
  }

  put(transactionTypes: TransactionTypes) {
    return this.http.put<TransactionTypes>(`${this.baseURL}`, transactionTypes);
  }

  delete(id: number | string) {
    return this.http.delete<TransactionTypes>(`${this.baseURL}/${id}`);
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
