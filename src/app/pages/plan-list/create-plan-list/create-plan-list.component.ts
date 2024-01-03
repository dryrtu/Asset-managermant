import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlanList } from 'src/app/domain/PlanList';
import { PlanListService } from 'src/app/service/PlanList.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-plan-list',
  templateUrl: './create-plan-list.component.html',
  styleUrls: ['./create-plan-list.component.css']
})
export class CreatePlanListComponent {
  submitting = false;
  planList: PlanList = new PlanList();

  constructor(
    public dialogRef: MatDialogRef<CreatePlanListComponent>,
    private planListService: PlanListService,
    protected router: Router,
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.submitting) {
      return;
    }
  
    this.submitting = true;
  
    this.planListService.createPlanList(this.planList).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Tạo danh sách năm thành công.',
        }).then(() => {
          this.router.navigate(['/admin/plan-list']);
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
