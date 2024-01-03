import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Unit } from 'src/app/domain/Unit';
import { UnitService } from 'src/app/service/UnitService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css'],
})
export class CreateUnitComponent   {

  unit: Unit = new Unit();

  constructor(
    public dialogRef: MatDialogRef<CreateUnitComponent>,
    private unitService: UnitService,
    protected router: Router,
  ) { }

  onSubmit(): void {
    this.save();
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    this.unitService.createUnit(this.unit).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Đơn vị tính đã được lưu thành công.',
        }).then(() => {
          this.router.navigate(['/admin/units']);
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
