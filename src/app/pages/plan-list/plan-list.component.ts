import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PlanList } from 'src/app/domain/PlanList';
import { PlanListService } from 'src/app/service/PlanList.service';
import { CreatePlanListComponent } from './create-plan-list/create-plan-list.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePlanListDetailComponent } from './create-plan-list-detail/create-plan-list-detail.component';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';
import Swal from 'sweetalert2';
import { UpdatePlanListDetailComponent } from './update-plan-list-detail/update-plan-list-detail.component';
import { UpdatePlanListComponent } from './update-plan-list/update-plan-list.component';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  planListDetail: PlanListDetail[] | any = [];

  planLists: PlanList[] | any = [];
  pageIndex: number;
  pageSize: number;
  totalItems: any;

  constructor(
    private planListService: PlanListService,
    private planListDetailService: PlanListDetailService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.onPageChange();
  }

  onPageChange() {
    this.planListService
      .getAllPlanList()
      .subscribe((data) => {
        this.planLists = data;
      });
  }
    // Xóa plan list
    deletePlanList(id: number) {
      // Sử dụng SweetAlert2 thay thế cửa sổ xác nhận của trình duyệt
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa danh sách này?',
        text: 'Hành động này sẽ xóa danh sách và không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          this.planListService.deletePlanList(id).subscribe(
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


    openDialog(): void {
      const dialogRef = this.dialog.open(CreatePlanListComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }



    openDialogCreatePlanListDetail(): void {
      const dialogRef = this.dialog.open(CreatePlanListDetailComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    deletePlanListDetail(id: number) {
      // Sử dụng SweetAlert2 thay thế cửa sổ xác nhận của trình duyệt
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa danh sách này?',
        text: 'Hành động này sẽ xóa danh sách và không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          this.planListDetailService.deletePlanListDetail(id).subscribe(
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

    viewPlanListDetails(id: any){
      this.planListDetailService
      .getPlansListDetailByYear(id)
      .subscribe((data) => {
        this.planListDetail = data;
      });
    }

    updatePlanList(id: any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { id: id };

      const dialogRef = this.dialog.open(UpdatePlanListComponent,dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    updatePlanListDetail(id: any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { id: id };

      const dialogRef = this.dialog.open(UpdatePlanListDetailComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

}
