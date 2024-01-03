import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ShoppingPlanService } from '../../../service/ShoppingPlan.service';
import { PlanListService } from '../../../service/PlanList.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanListDetailService } from '../../../service/PlanListDetail.service';
import { ProductTypeDetailService } from '../../../service/ProductTypeDetail.service';
import { ProductTypeService } from '../../../service/ProductType.service';
import { UnitService } from '../../../service/UnitService';
import { CurrencyService } from '../../../service/CurrencyService';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ShoppingPlan } from '../../../domain/ShoppingPlan';
import { PlanList } from '../../../domain/PlanList';
import { PlanListDetail } from '../../../domain/PlanListDetail';
import { ProductType } from '../../../domain/ProductType';
import { ProductTypeDetail } from '../../../domain/ProductTypeDetail';
import { Unit } from '../../../domain/Unit';
import { Currency } from '../../../domain/Currency';
import Swal from 'sweetalert2';
import { CreatePlanListDetailComponent } from '../../plan-list/create-plan-list-detail/create-plan-list-detail.component';
import * as XLSX from 'xlsx';
import { format, isDate } from 'date-fns';
import { ShoppingPlanComponent } from '../shopping-plan.component';

@Component({
  selector: 'app-view-shopping-plan',
  templateUrl: './view-shopping-plan.component.html',
  styleUrls: ['./view-shopping-plan.component.css'],
})
export class ViewShoppingPlanComponent implements OnInit {
  constructor(
    private shoppingPlanService: ShoppingPlanService,
    protected router: Router,
    private planListDetailService: PlanListDetailService,
    private route: ActivatedRoute
  ) {
    this.userRole = localStorage.getItem('role');
  }

  // tslint:disable-next-line:ban-types
  shoppingPlan: any;
  selectedProduct: any;
  planListOptions: PlanList[] | any = [];
  planListDetail: PlanListDetail[] | any = [];
  shoppingPlanList: ShoppingPlan[] | any = [];
  shoppingPlanListNotPageable: ShoppingPlan[] | any = [];
  userRole: string;

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadPlanListDetailById(id);
    this.loadProductList(id);
  }

  loadPlanListDetailById(id: number) {
    this.planListDetailService.getPlanListDetailByIdd(id).subscribe(
      (data) => {
        this.planListDetail = data;
      },
      (error) => console.log(error)
    );
  }

  loadProductList(id: number) {
    this.shoppingPlanService
      .getShoppingPlanByPlanListDetailNotPagination(id)
      .subscribe(
        (data) => {
          this.shoppingPlanList = data;
          console.log(data);
        },
        (error) => console.log(error)
      );
  }

  showProduct(event: any) {
    this.selectedProduct = event.target.value;
    console.log(this.selectedProduct);
    this.shoppingPlanService
      .getShoppingPlan(this.selectedProduct)
      .subscribe((data) => {
        this.shoppingPlan = data;
      });
  }

  // Xóa sp
  deleteShoppingPlan(id: number) {
    console.log(id);
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (confirmed) {
      this.shoppingPlanService.deleteShoppingPlan(id).subscribe((data: any) => {
        console.log(data);
      });
      window.location.reload();
      (error) => {
        console.log('Lỗi ko xóa được');
      };
    }
  }


  changePlanListStatusToApproved(id: number) {
    Swal.fire({
      title: 'Xác nhận phê duyệt kế hoạch mua sắm',
      text: 'Bạn có muốn phê duyệt kế hoạch này?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.planListDetailService.changePlanListStatusToApproved(id).subscribe(
          (data: any) => {
            Swal.fire(
              'Phê duyệt thành công!',
              'Kế hoạch đã được phê duyệt.',
              'success'
            );
            this.router.navigate(['/assetmngtfe/admin/danh-muc-mua-sam']);
            setTimeout(() => {
              window.location.reload();
            }, 2000); // 2000 ms = 2 giây
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể phê duyệt kế hoạch.', 'error');
          }
        );
      }
    });
  }

  exportToExcel() {
    // Chọn các trường muốn xuất
    const selectedFields = this.shoppingPlanList.map((item) => ({
      'Số hiệu': item.id,
      'Năm thực hiện': item.planListDetails[0].planList[0].year,
      'Tên kế hoạch': item.planListDetails[0].nameOfPlanList,
      Serial: item.serial,
      'Tên sản phẩm': item.productName,
      'Phân loại': item.productTypeDetails[0].productTypes[0].type,
      'Nhóm sản phẩm': item.productTypeDetails[0].typeDetail,
      'Số lượng': item.quantity,
      'Đơn vị': item.units[0].unitName,
      'Đơn giá dự kiến': item.expectedPrice,
      'Thành tiền': item.expectedPrice * item.quantity,
      'Loại tiền': item.currencies[0].currencyUnit,
      'Trạng thái': item.status,
      'Người tạo': item.createdBy,
      'Ngày tạo': this.formatLocalDate(item.createdDateTime),
      'Ghi chú': item.description,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedFields);

    worksheet['!cols'] = [
      { wpx: 45 },
      { wpx: 85 },
      { wpx: 250 },
      { wpx: 80 },
      { wpx: 250 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 60 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 300 },
    ];

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'Kế hoạch mua sắm');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const a: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private formatLocalDate(dateArray: number[]): string {
    const parsedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    if (isDate(parsedDate)) {
      return format(parsedDate, 'dd/MM/yyyy');
    } else {
      return '';
    }
  }
}
