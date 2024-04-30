import Product from './product.model';
import TransactionTypes from './transaction-types.model';

export default class Transaction {
  id = 0;
  productId = 0;
  transactionTypeId = 0;
  quantity = 0;
  updateDate = new Date();
  isDelete = false;
  product = new Product();
  transactionType = new TransactionTypes();
}
