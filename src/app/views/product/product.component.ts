import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Response } from '../../models/response.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [RouterModule, CommonModule, FormsModule],
})
export class ProductComponent implements OnInit {
  AllProduct: Product[] = [];
  idProduct = 0;
  isAddProduct: boolean = false;
  isEditProduct: boolean = false;

  product = new Product();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (result: Response) => {
        // console.log(result);
        this.AllProduct = result.data;
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
      this.isEditProduct = false;
    } else {
      this.isAddProduct = true;
      this.isEditProduct = false;
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
}
