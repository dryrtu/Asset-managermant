import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductType } from 'src/app/domain/ProductType';
import { CreateProductTypeDetailComponent } from '../create-product-type-detail/create-product-type-detail.component';
import { ProductTypeService } from 'src/app/service/ProductType.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product-type',
  templateUrl: './create-product-type.component.html',
  styleUrls: ['./create-product-type.component.css']
})
export class CreateProductTypeComponent implements OnInit {


  productType: ProductType = new ProductType();

  constructor(
    public dialogRef: MatDialogRef<CreateProductTypeDetailComponent>,
    private productTypeService: ProductTypeService,
    protected router: Router,
  ) { }


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.save();
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    this.productTypeService.createProductType(this.productType).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Tạo danh sách phân loại thành công.',
        }).then(() => {
          this.router.navigate(['/admin/product-types']);
          this.close();
          location.reload();
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thông tin không hợp lệ hoặc đã tồn tại.',
        });
      }
    );
  }
}
