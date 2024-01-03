import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlanList } from 'src/app/domain/PlanList';
import { PlanListService } from 'src/app/service/PlanList.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-plan-list',
  templateUrl: './update-plan-list.component.html',
  styleUrls: ['./update-plan-list.component.css']
})
export class UpdatePlanListComponent implements OnInit {

  id: any
  // planList: PlanList = new PlanList()
  planList: PlanList[] | any = []
  submitting = false;
  constructor(
    public dialogRef: MatDialogRef<UpdatePlanListComponent>,
    private planListService: PlanListService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.id
    }

  ngOnInit(): void {
    this.planListService.getPlanListById(this.id).subscribe(data => {
      this.planList = data;
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
    this.planListService.updatePlanList(this.id, this.planList).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Cập nhật thành công.',
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
