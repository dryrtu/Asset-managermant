import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Supplier } from 'src/app/domain/Supplier';
import { SupplierService } from 'src/app/service/Supplier.service';
import Swal from 'sweetalert2';
import { UpdateCurrencyComponent } from '../../currency/update-currency/update-currency.component';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {

  id: number;
  supplier: Supplier = new Supplier();

  constructor(
    private supplierService: SupplierService,
    public dialogRef: MatDialogRef<UpdateSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
   }

  ngOnInit(): void {
    this.supplierService.getSupplierById(this.id).subscribe(data => {
      this.supplier = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.supplierService.updateSupplier(this.id, this.supplier).subscribe(
      () => {
        Swal.fire({
          title: 'Cập nhật thành công!',
          text: 'Thông tin nhà cung cấp đã được cập nhật.',
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
