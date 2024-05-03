import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Categories from '../../models/categories.model';
import { CategoriesService } from '../../services/categories.service';
import { Response } from '../../models/response.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  imports: [RouterModule, CommonModule, FormsModule, MatIconModule],
})
export class CategoriesComponent implements OnInit {
  AllCategories: Categories[] = [];
  idCategory = 0;
  isAddCategory: boolean = false;
  isEditCategory: boolean = false;

  categories = new Categories();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      (result: Response) => {
        // console.log(result.data);
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
      this.categoriesService.delete(productId).subscribe(
        (result) => {
          this.AllCategories = this.AllCategories.filter(
            (p) => p.id !== productId
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // Create Category Component
  onAddCategory() {
    if (this.isAddCategory) {
      this.isAddCategory = false;
      this.isEditCategory = false;
    } else {
      this.isAddCategory = true;
      this.isEditCategory = false;
    }

    // เมื่อเปิดทำงานให้ reset ค่าในฟอร์ม
    this.categories = new Categories();
  }
  closeAddCategory() {
    this.isAddCategory = false;
  }

  // Edit Category Component
  onEditCategory(categoryId: number) {
    // console.log(productId);
    this.isEditCategory = true;
    this.isAddCategory = false;
    this.idCategory = categoryId;

    this.categoriesService.getCategoriesById(this.idCategory).subscribe(
      (result: Response) => {
        // console.log(result);
        this.categories = result.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  closeEditCategory() {
    this.isEditCategory = false;
  }

  onSubmitUpdate() {
    this.categoriesService.put(this.categories).subscribe(
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
    this.categoriesService.post(this.categories).subscribe(
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

  isAscendingOrder: boolean = true;

  onSortId() {
    if (this.isAscendingOrder) {
      this.AllCategories = this.AllCategories.sort((a, b) => b.id - a.id); // จากมากไปน้อย
    } else {
      this.AllCategories = this.AllCategories.sort((a, b) => a.id - b.id); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }

  onSortCreateDate() {
    if (this.isAscendingOrder) {
      this.AllCategories = this.AllCategories.sort(
        (a, b) =>
          new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
      ); // จากมากไปน้อย
    } else {
      this.AllCategories = this.AllCategories.sort(
        (a, b) =>
          new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime()
      ); // จากน้อยไปมาก
    }

    this.isAscendingOrder = !this.isAscendingOrder;
  }
}
