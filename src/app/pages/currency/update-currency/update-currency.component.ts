import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Currency } from 'src/app/domain/Currency';
import { CurrencyService } from 'src/app/service/CurrencyService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-currency',
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.css']
})
export class UpdateCurrencyComponent implements OnInit {
  submitting = false;
  id: number;
  currency: Currency = new Currency();

  constructor(
    private currencyService: CurrencyService,
    public dialogRef: MatDialogRef<UpdateCurrencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
   }

  ngOnInit(): void {
    console.log(this.data)
    this.currencyService.getCurrencyById(this.id).subscribe(data => {
      this.currency = data;
    }, error => console.log(error));
  }

  onSubmit() {
    if (this.submitting) {
      return;
    }
  
    this.submitting = true;
  
    this.currencyService.updateCurrency(this.id, this.currency).subscribe(
      () => {
        Swal.fire({
          title: 'Cập nhật thành công!',
          text: 'Thông tin tiền tệ đã được cập nhật.',
          icon: 'success',
        }).then(() => {
          window.location.reload();
          this.submitting = false;
        });
      },
      (error: any) => {
        Swal.fire('Lỗi!', 'Không thể cập nhật dữ liệu.', 'error').then(() => {
          this.submitting = false;
        });
        console.log(error);
      }
    );
  }
  
  

  close(): void {
    this.dialogRef.close();
  }
}
