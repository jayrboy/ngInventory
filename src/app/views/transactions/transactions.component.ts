import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import Transaction from '../../models/transaction.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
})
export class TransactionsComponent implements OnInit {
  AllTransaction: Transaction[] = [];
  idTransaction = 0;
  idTransactionType = '1';

  transaction = new Transaction();

  searchProductName = '';
  showTransaction: Transaction[] = [];

  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  clickedButton: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactionPage(this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTransactionPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTransactionPage(this.currentPage);
    }
  }

  loadTransactionPage(page: number) {
    this.transactionService.getTransactionByPage(page).subscribe(
      (result) => {
        this.currentPage = page;
        this.showTransaction = result;
        this.clickedButton = page;
      },
      (error) => {
        console.error(error);
      }
    );
    this.transactionService.getTransactions().subscribe(
      (result) => {
        this.AllTransaction = result;
        this.totalPages = Math.ceil(result.length / 10); // Assuming pageSize is 5
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onKey(event: any) {
    this.searchProductName = event.target?.value;

    // console.log({
    //   name: this.searchProductName,
    //   transactionTypeId: this.idTransactionType,
    // });

    this.showTransaction = this.AllTransaction.filter((t) => {
      return (
        t.product.name.includes(this.searchProductName) &&
        t.transactionTypeId == parseInt(this.idTransactionType)
      );
    });
    // console.log(this.showTransaction);
  }

  isAscendingOrder: boolean = true;

  onSortId() {
    if (this.isAscendingOrder) {
      this.showTransaction = this.showTransaction.sort((a, b) => b.id - a.id); // จากมากไปน้อย
    } else {
      this.showTransaction = this.showTransaction.sort((a, b) => a.id - b.id); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortProduct() {
    if (this.isAscendingOrder) {
      this.showTransaction = this.showTransaction.sort(
        (a, b) => b.productId - a.productId
      ); // จากมากไปน้อย
    } else {
      this.showTransaction = this.showTransaction.sort(
        (a, b) => a.productId - b.productId
      ); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortTransaction() {
    if (this.isAscendingOrder) {
      this.showTransaction = this.showTransaction.sort(
        (a, b) => b.transactionTypeId - a.transactionTypeId
      ); // จากมากไปน้อย
    } else {
      this.showTransaction = this.showTransaction.sort(
        (a, b) => a.transactionTypeId - b.transactionTypeId
      ); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortQuantity() {
    if (this.isAscendingOrder) {
      this.showTransaction = this.showTransaction.sort(
        (a, b) => b.quantity - a.quantity
      ); // จากมากไปน้อย
    } else {
      this.showTransaction = this.showTransaction.sort(
        (a, b) => a.quantity - b.quantity
      ); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortUpdateDate() {
    if (this.isAscendingOrder) {
      this.showTransaction = this.showTransaction.sort(
        (a, b) =>
          new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
      ); // จากมากไปน้อย
    } else {
      this.showTransaction = this.showTransaction.sort(
        (a, b) =>
          new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime()
      ); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onAutoLoad() {
    window.location.reload();
  }
  //
}
