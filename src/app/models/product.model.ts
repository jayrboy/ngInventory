import Categories from './categories.model';

export default class Product {
  id = 0;
  name = '';
  description = '';
  categoryID = 0;
  stockQuantity = 0;
  price = 0;
  createDate = new Date();
  updateDate = new Date();
  isDelete = false;
  categories = new Categories();
}
