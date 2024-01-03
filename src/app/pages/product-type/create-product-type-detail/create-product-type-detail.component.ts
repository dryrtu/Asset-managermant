import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductTypeDetail } from 'src/app/domain/ProductTypeDetail';
import { ProductTypeService } from 'src/app/service/ProductType.service';
import { ProductTypeDetailService } from 'src/app/service/ProductTypeDetail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product-type-detail',
  templateUrl: './create-product-type-detail.component.html',
  styleUrls: ['./create-product-type-detail.component.css']
})
export class CreateProductTypeDetailComponent implements OnInit {


  productTypeDetail: ProductTypeDetail = new ProductTypeDetail();
  productTypeOptions:  ProductType[] | any = [];

  constructor(
    public dialogRef: MatDialogRef<CreateProductTypeDetailComponent>,
    private productTypeDetailService: ProductTypeDetailService,
    private productTypeService: ProductTypeService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProductTypeOptions();
  }

  onSubmit(): void {
    this.save();
  }

  close(): void {
    this.dialogRef.close();
  }

  selectedProductTypeId: any;

  onChange(event: any) {
    this.selectedProductTypeId = event.target.value;
  }

      // Lấy danh sách product type
      loadProductTypeOptions() {
        this.productTypeService.getAllProductType().subscribe((data: any) => {
          this.productTypeOptions = Object.values(data);
        });
      }

      
  save() {
    const data = {
      typeDetail: this.productTypeDetail.typeDetail,
      productTypeId: [parseInt(this.selectedProductTypeId)],
    };

    this.productTypeDetailService.createProductTypeDetail(data).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Tạo nhóm sản phẩm thành công.',
        }).then(() => {
          this.router.navigate(['/admin/product-types']);
          this.close();
          location.reload()
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
