import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Currency } from 'src/app/domain/Currency';
import { CurrencyService } from 'src/app/service/CurrencyService';
import Swal from 'sweetalert2';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { UpdateCurrencyComponent } from './update-currency/update-currency.component';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {


  pageIndex: number;
  pageSize: number;
  totalItems: any;
  currencyList: Currency[] | any = [];

  constructor(
    private currencyService: CurrencyService,
    private dialog: MatDialog,
  ) {
    }

  ngOnInit(): void {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.onPageChange(initialPageEvent);
  }

     // Hiển thị danh sách có phân trang
     onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.currencyService
        .getCurrencyList(this.pageIndex, this.pageSize)
        .subscribe((data) => {
          this.currencyList = data.content;
          this.totalItems = data.totalElements;
        });
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCurrencyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  isDeletingCurrency: boolean = false;
  deleteCurrency(id: number) {
    if (this.isDeletingCurrency) {
      return;
    }
  
    Swal.fire({
      title: 'Xác nhận xóa đơn vị tiền tệ',
      text: 'Bạn có chắc chắn muốn xóa đơn vị tiền tệ này này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeletingCurrency = true;
  
        this.currencyService.deleteCurrency(id).subscribe(
          (data: any) => {
            Swal.fire('Xóa thành công!', 'Đơn vị đã được xóa.', 'success');
            window.location.reload();
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa', 'error');
          }
        ).add(() => {
          this.isDeletingCurrency = false;
        });
      }
    });
  }
  

  
  openDialogUpdateCurrency(id: number): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: id };

    const dialogRef = this.dialog.open(UpdateCurrencyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });

  }

}
