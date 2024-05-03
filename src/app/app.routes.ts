import { Routes } from '@angular/router';
import { ProductComponent } from './views/product/product.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { TransactionsComponent } from './views/transactions/transactions.component';
import { TransactionTypeComponent } from './views/transaction-type/transaction-type.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transaction-type', component: TransactionTypeComponent },
];
