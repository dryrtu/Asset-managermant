import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Supplier } from 'src/app/domain/Supplier';
import { SupplierService } from 'src/app/service/Supplier.service';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import Swal from 'sweetalert2';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  pageIndex: number;
  pageSize: number;
  totalItems: any;
  supplierList: Supplier[] | any = [];

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
  ) {
    }

  ngOnInit(): void {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.onPageChange(initialPageEvent);
  }

     // Hiển thị danh sách có phân trang
     onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.supplierService
        .getSupplierList(this.pageIndex, this.pageSize)
        .subscribe((data) => {
          this.supplierList = data.content;
          console.log(this.supplierList)
          this.totalItems = data.totalElements;
        });
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateSupplierComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteSupplier(id: number) {
    Swal.fire({
      title: 'Xác nhận xóa nhà cung cấp',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.deleteSupplier(id).subscribe(
          (data: any) => {
            Swal.fire('Xóa thành công!', 'Sản phẩm đã được xóa.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 2000); // 2000 ms = 2 giây
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa sản phẩm.', 'error');
          }
        );
      }
    });
  }
  

  openDialogUpdateSupplier(id: number): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: id };

    const dialogRef = this.dialog.open(UpdateSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });

  }

}
