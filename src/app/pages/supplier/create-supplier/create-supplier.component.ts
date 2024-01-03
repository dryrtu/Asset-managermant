import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/domain/Supplier';
import { SupplierService } from 'src/app/service/Supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css'],
})
export class CreateSupplierComponent {
  supplier: Supplier = new Supplier();
  supplierForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateSupplierComponent>,
    private supplierService: SupplierService,
    protected router: Router,
    private formBuilder: FormBuilder)
   {
    this.supplierForm = this.formBuilder.group({
      supplierName: ['', [Validators.required]],
      supplierCode: ['']
    });
   }

  onSubmit(): void {
    console.log(this.supplier);
    this.save();
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    this.supplierService.createSupplier(this.supplier).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thông tin nhà cung cấp đã được lưu thành công.',
        }).then(() => {
          this.router.navigate(['/admin/suppliers']);
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
