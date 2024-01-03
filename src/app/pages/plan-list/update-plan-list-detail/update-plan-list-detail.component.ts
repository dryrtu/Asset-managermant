import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-plan-list-detail',
  templateUrl: './update-plan-list-detail.component.html',
  styleUrls: ['./update-plan-list-detail.component.css']
})
export class UpdatePlanListDetailComponent implements OnInit {
  submitting = false;
  id: any
  // planList: PlanList = new PlanList()
  planListDetail: PlanListDetail[] | any = []

  constructor(
    public dialogRef: MatDialogRef<UpdatePlanListDetailComponent>,
    private planListDetailService: PlanListDetailService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.id
    }

  ngOnInit(): void {
    this.planListDetailService.getPlanListDetailByIdd(this.id).subscribe(data => {
      this.planListDetail = data;
    }, error => console.log(error));
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.planListDetailService.updatePlanListDetail(this.id, this.planListDetail).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Chỉnh sửa danh mục thành công.',
        }).then(() => {
          this.close();
          location.reload();
          this.submitting = false;
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thông tin không hợp lệ hoặc đã tồn tại.',
        }).then(() => {
          this.submitting = false;
        });
      }
    );
  }



}
