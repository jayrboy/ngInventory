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
  isAddTransaction: boolean = false;

  transaction = new Transaction();

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(
      (result) => {
        console.log(result);
        this.AllTransaction = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Create Transaction Component
  onAddTransaction() {
    if (this.isAddTransaction) {
      this.isAddTransaction = false;
    } else {
      this.isAddTransaction = true;
    }

    // เมื่อเปิดทำงานให้ reset ค่าในฟอร์ม
    this.transaction = new Transaction();
  }
  closeAddTransaction() {
    this.isAddTransaction = false;
  }

  onSubmitCreate() {
    console.log(this.transaction);

    // this.transactionService.post(this.transaction).subscribe(
    //   (result) => {
    //     // console.log('Transaction added successfully:', result);
    //     window.location.reload();
    //   },
    //   (error) => {
    //     console.error('Error adding Transaction:', error);
    //   }
    // );
  }
}
