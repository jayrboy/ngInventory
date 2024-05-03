import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Response } from '../../models/response.model';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import Transaction from '../../models/transaction.model';
import { CategoriesService } from '../../services/categories.service';
import Categories from '../../models/categories.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
})
export class ProductComponent implements OnInit {
  AllProduct: Product[] = [];
  AllCategories: Categories[] = [];

  idProduct = 0;
  isAddProduct: boolean = false;
  isEditProduct: boolean = false;

  product = new Product();
  transaction = new Transaction();

  isExp: boolean = false;
  isAddStock: boolean = false;
  isSale: boolean = false;

  quantity = 0;
  addStock = 0;
  saleQuantity = 0;

  dropdownOpen: boolean = false;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    // Product
    this.productService.getProducts().subscribe(
      (result: Response) => {
        // console.log(result.data);
        this.AllProduct = result.data;
      },
      (error) => {
        console.error(error);
      }
    );
    // Categories
    this.categoriesService.getCategories().subscribe(
      (result: Response) => {
        // console.log(result);
        this.AllCategories = result.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onClickDelete(productId: number) {
    const confirmDelete = confirm('ยืนยันลบรายการนี้?');
    if (confirmDelete) {
      this.productService.delete(productId).subscribe(
        (result) => {
          this.AllProduct = this.AllProduct.filter((p) => p.id !== productId);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // Create Product Component
  onAddProduct() {
    if (this.isAddProduct) {
      this.isAddProduct = false;
    } else {
      this.isAddProduct = true;
      this.isEditProduct = false;
      this.isExp = false;
      this.isAddStock = false;
      this.isSale = false;
    }

    // เมื่อเปิดทำงานให้ reset ค่าในฟอร์ม
    this.product = new Product();
  }
  closeAddProduct() {
    this.isAddProduct = false;
  }

  // Edit Product Component
  onEditProduct(productId: number) {
    // console.log(productId);

    this.isEditProduct = true;
    this.isAddProduct = false;
    this.isSale = false;
    this.isExp = false;
    this.idProduct = productId;

    this.productService.getProduct(this.idProduct).subscribe(
      (result: Response) => {
        // console.log(result);
        this.product = result.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  closeEditProduct() {
    this.isEditProduct = false;
  }

  onSubmitUpdate() {
    console.log(this.product);

    this.productService.put(this.product).subscribe(
      (result) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmitCreate() {
    // console.log(this.product);
    this.productService.post(this.product).subscribe(
      (result) => {
        console.log('Product added successfully:', result);
        // เมื่อเพิ่มผลิตภัณฑ์สำเร็จให้โหลดหน้าใหม่เพื่อแสดงผลล่าสุด
        window.location.reload();
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  //หมดอายุ
  onExp(productId: number) {
    if (this.isExp) {
      this.isExp = false;
    } else {
      this.isExp = true;
      this.idProduct = productId;
      this.isEditProduct = false;
      this.isAddProduct = false;
      this.isSale = false;
      this.isAddStock = false;
      this.isSale = false;
      this.dropdownOpen = false;
    }
  }

  onSubmitExp() {
    // console.log(this.product.id);

    const data = {
      id: this.product.id,
      quantity: this.quantity,
    };

    // console.log(data);

    this.productService.updateQuantity(data).subscribe(
      (result) => {
        // console.log(result);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  closeExp() {
    this.isExp = false;
  }

  //เพิ่มสต๊อก
  onAddStock(productId: number) {
    if (this.isAddStock) {
      this.isAddStock = false;
    } else {
      this.isAddStock = true;
      this.idProduct = productId;
      this.isEditProduct = false;
      this.isExp = false;
      this.isAddProduct = false;
      this.isSale = false;
      this.dropdownOpen = false;
    }
  }

  onSubmitAddStock() {
    const data = {
      id: this.product.id,
      quantity: this.addStock,
    };
    // console.log(data);

    this.productService.addQuantity(data).subscribe(
      (result) => {
        // console.log(result);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  closeAddStock() {
    this.isAddStock = false;
  }

  //ขาย
  onSale(productId: number) {
    if (this.isSale) {
      this.isSale = false;
    } else {
      this.isSale = true;
      this.isAddStock = false;
      this.idProduct = productId;
      this.isEditProduct = false;
      this.isExp = false;
      this.isAddProduct = false;
      this.dropdownOpen = false;
    }
  }

  onSubmitSale() {
    const data = {
      id: this.product.id,
      quantity: this.saleQuantity,
    };
    console.log(data);

    this.productService.saleQuantity(data).subscribe(
      (result) => {
        // console.log(result);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  closeSale() {
    this.isSale = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  isAscendingOrder: boolean = true;

  onSortId() {
    if (this.isAscendingOrder) {
      this.AllProduct = this.AllProduct.sort((a, b) => b.id - a.id); // จากมากไปน้อย
    } else {
      this.AllProduct = this.AllProduct.sort((a, b) => a.id - b.id); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortQuantity() {
    if (this.isAscendingOrder) {
      this.AllProduct = this.AllProduct.sort(
        (a, b) => b.stockQuantity - a.stockQuantity
      ); // จากมากไปน้อย
    } else {
      this.AllProduct = this.AllProduct.sort(
        (a, b) => a.stockQuantity - b.stockQuantity
      ); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortPrice() {
    if (this.isAscendingOrder) {
      this.AllProduct = this.AllProduct.sort((a, b) => b.price - a.price); // จากมากไปน้อย
    } else {
      this.AllProduct = this.AllProduct.sort((a, b) => a.price - b.price); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }
}
