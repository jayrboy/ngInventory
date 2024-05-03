import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import Transaction from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  imports: [RouterModule, CommonModule, FormsModule],
})
export class TransactionsComponent implements OnInit {
  AllTransaction: Transaction[] = [];
  idTransaction = 0;
  idTransactionType = '1';

  transaction = new Transaction();

  searchProductName = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(
      (result) => {
        // console.log(result);
        this.AllTransaction = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onKey(event: any) {
    this.searchProductName = event.target?.value;

    console.log({
      name: this.searchProductName,
      transactionTypeId: this.idTransactionType,
    });
  }
}
