import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Unit } from 'src/app/domain/Unit';
import { UnitService } from 'src/app/service/UnitService';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UpdateUnitComponent } from './update-unit/update-unit.component';


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  unitList: Unit[] | any = [];
  pageIndex: number;
  pageSize: number;
  totalItems: any;

  constructor(
    private unitService: UnitService,
    private dialog: MatDialog,

  ) { }

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
      this.unitService
        .getUnitList(this.pageIndex, this.pageSize)
        .subscribe((data) => {
          this.unitList = data.content;
          console.log(this.unitList)
          this.totalItems = data.totalElements;
        });
    }


    // Xóa unit
    deleteUnit(id: number) {
      Swal.fire({
        title: 'Xác nhận xóa đơn vị tính',
        text: 'Bạn có chắc chắn muốn xóa đơn vị tính này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          this.unitService.deleteUnit(id).subscribe(
            (data: any) => {
              Swal.fire('Xóa thành công!', 'Đơn vị tính đã được xóa.', 'success');
              window.location.reload();
            },
            (error) => {
              Swal.fire('Lỗi!', 'Không thể xóa đơn vị tính.', 'error');
              window.location.reload();
            }
          );
        }
      });
    }
    

    openDialog(): void {
      const dialogRef = this.dialog.open(CreateUnitComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    

    openDialogUpdateUnit(id: number): void {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { id: id };
  
      const dialogRef = this.dialog.open(UpdateUnitComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
      });
  
    }

}
