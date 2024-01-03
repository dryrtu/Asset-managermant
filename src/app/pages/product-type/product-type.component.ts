import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProductTypeDetail } from 'src/app/domain/ProductTypeDetail';
import { ProductTypeService } from 'src/app/service/ProductType.service';
import { ProductTypeDetailService } from 'src/app/service/ProductTypeDetail.service';
import Swal from 'sweetalert2';
import { CreatePlanListDetailComponent } from '../plan-list/create-plan-list-detail/create-plan-list-detail.component';
import { CreatePlanListComponent } from '../plan-list/create-plan-list/create-plan-list.component';
import { CreateProductTypeDetailComponent } from './create-product-type-detail/create-product-type-detail.component';
import { CreateProductTypeComponent } from './create-product-type/create-product-type.component';
import { ProductType } from 'src/app/domain/ProductType';
import { UpdateProductTypeDetailComponent } from './update-product-type-detail/update-product-type-detail.component';
import { UpdateProductTypeComponent } from './update-product-type/update-product-type.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css'],
})
export class ProductTypeComponent implements OnInit {
  ProductType: ProductType[] | any = [];
  productTypeDetail: ProductTypeDetail[] | any = [];

  constructor(
    private productTypeService: ProductTypeService,
    private productTypeDetailService: ProductTypeDetailService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onPageChange();
  }

  onPageChange() {
    this.productTypeService.getAllProductType().subscribe((data) => {
      this.ProductType = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductTypeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogCreateProductTypeDetail(): void {
    const dialogRef = this.dialog.open(CreateProductTypeDetailComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewProductTypeDetails(id: any) {
    this.openProductTypeDetails(id);
  }

  openProductTypeDetails(id: any) {
    this.productTypeDetailService
      .getProductTypeDetailByType(id)
      .subscribe((data) => {
        this.productTypeDetail = data;
      });
  }

  // Xóa plan list
  deleteProductType(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh sách này?',
      text: 'Hành động này sẽ xóa danh sách và không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productTypeService.deleteProductType(id).subscribe(
          (data: any) => {
            Swal.fire('Xóa thành công!', 'Danh sách đã được xóa.', 'success');
            window.location.reload();
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa danh sách.', 'error');
            window.location.reload();
          }
        );
      }
    });
  }

  deleteProductTypeDetail(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh sách này?',
      text: 'Hành động này sẽ xóa danh sách và không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productTypeDetailService.deleteProductTypeDetail(id).subscribe(
          (data: any) => {
            Swal.fire('Xóa thành công!', 'Danh sách đã được xóa.', 'success');
            window.location.reload();
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa danh sách.', 'error');
            window.location.reload();
          }
        );
      }
    });
  }

  updateProductType(id: any){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { id: id };

      const dialogRef = this.dialog.open(UpdateProductTypeComponent,dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  updateProductTypeDetail(id: any){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { id: id };

      const dialogRef = this.dialog.open(UpdateProductTypeDetailComponent,dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

}
