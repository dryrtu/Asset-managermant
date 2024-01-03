import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Currency } from 'src/app/domain/Currency';
import { CurrencyService } from 'src/app/service/CurrencyService';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-currency',
  templateUrl: './create-currency.component.html',
  styleUrls: ['./create-currency.component.css']
})
export class CreateCurrencyComponent  {

  currency: Currency = new Currency();
  submitting = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCurrencyComponent>,
    private currencyService: CurrencyService,
    protected router: Router
  ) {}

onSubmit(): void {
  if (this.submitting) {
    return;
  }
  this.submitting = true;
  this.currencyService.createCurrency(this.currency).subscribe(
    (data) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Thông tin tiền tệ đã được lưu thành công.',
      }).then(() => {
        this.router.navigate(['/admin/currencies']);
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


  close(): void {
    this.dialogRef.close();
  }
}
