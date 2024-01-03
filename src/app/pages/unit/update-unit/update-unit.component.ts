import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from 'src/app/domain/Unit';
import { UnitService } from 'src/app/service/UnitService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.css']
})
export class UpdateUnitComponent implements OnInit {

  id: number;
  unit: Unit = new Unit();

  constructor(
    private unitService: UnitService,
    public dialogRef: MatDialogRef<UpdateUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
   }

  ngOnInit(): void {
    console.log(this.data)
    this.unitService.getUnitById(this.id).subscribe(data => {
      this.unit = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.unitService.updateUnit(this.id, this.unit).subscribe(
      () => {
        Swal.fire({
          title: 'Cập nhật thành công!',
          text: 'Thông tin đơn vị đã được cập nhật.',
          icon: 'success',
        }).then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        Swal.fire('Lỗi!', 'Không thể cập nhật dữ liệu.', 'error');
        console.log(error);
      }
    );
  }
  

  close(): void {
    this.dialogRef.close();
  }

}
