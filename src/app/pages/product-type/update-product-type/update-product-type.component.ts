import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductTypeService } from 'src/app/service/ProductType.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css']
})
export class UpdateProductTypeComponent implements OnInit {

 
  id: any
  // planList: PlanList = new PlanList()
  productType: ProductType[] | any = []

  constructor(
    public dialogRef: MatDialogRef<UpdateProductTypeComponent>,
    private productTypeService: ProductTypeService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.id
    }

  ngOnInit(): void {
    this.productTypeService.getProductTypeByIdd(this.id).subscribe(data => {
      this.productType = data;
      console.log(this.productType)
    }, error => console.log(error));
  }

  onSubmit(){
    this.save();
  }
  close(): void {
    this.dialogRef.close();
  }
  save() {
    this.productTypeService.updateProductType(this.id, this.productType).subscribe(
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
