import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductTypeDetail } from 'src/app/domain/ProductTypeDetail';
import { ProductTypeDetailService } from 'src/app/service/ProductTypeDetail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product-type-detail',
  templateUrl: './update-product-type-detail.component.html',
  styleUrls: ['./update-product-type-detail.component.css']
})
export class UpdateProductTypeDetailComponent implements OnInit {

  id: any
  productTypeDetail: ProductTypeDetail[] | any = []

  constructor(
    public dialogRef: MatDialogRef<UpdateProductTypeDetailComponent>,
    private productTypeDetailService: ProductTypeDetailService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.id
    }

  ngOnInit(): void {
    console.log(this.data)
    this.productTypeDetailService.getProductTypeDetailById(this.id).subscribe(data => {
      this.productTypeDetail = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.save();
  }
  close(): void {
    this.dialogRef.close();
  }
  save() {
    this.productTypeDetailService.updateProductType(this.id, this.productTypeDetail).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Cập nhật thành công.',
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
