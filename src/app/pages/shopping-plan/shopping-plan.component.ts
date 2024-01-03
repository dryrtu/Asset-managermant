import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PlanList } from 'src/app/domain/PlanList';
import { ShoppingPlan } from 'src/app/domain/ShoppingPlan';
import { PlanListService } from 'src/app/service/PlanList.service';
import { ShoppingPlanService } from 'src/app/service/ShoppingPlan.service';
import * as XLSX from 'xlsx';
import { LocalDate } from '@js-joda/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddToAssetComponent } from './add-to-asset/add-to-asset.component';
import { SearchShoppingPlanComponent } from './search-shopping-plan/search-shopping-plan.component';
import { CreateShoppingPlanComponent } from './create-shopping-plan/create-shopping-plan.component';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import { ViewAssetModalComponent } from '../asset/view-asset-modal/view-asset-modal.component';
import { AssetService } from 'src/app/service/asset.service';
import { UpdateShoppingPlanComponent } from './update-shopping-plan/update-shopping-plan.component';
import { format, isDate } from 'date-fns';
import { ViewShoppingPlanComponent } from './view-shopping-plan/view-shopping-plan.component';

@Component({
  selector: 'app-shopping-plan',
  templateUrl: './shopping-plan.component.html',
  styleUrls: ['./shopping-plan.component.css'],
})
export class ShoppingPlanComponent implements OnInit {
  shoppingPlanList: ShoppingPlan[] | any = [];
  shoppingPlanListNotPageable: ShoppingPlan[] | any = [];
  pageIndex: number;
  pageSize: number;
  totalItems: any;
  searchForm: FormGroup;
  planListOptions: PlanList[] | any = [];
  userRole: string;
  checkForm: any;

  selectedYear: any;
  planListDetail: PlanListDetail[] | any = [];

  initialPageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  idAsset: any;

  constructor(
    private shoppingPlanService: ShoppingPlanService,
    private planListService: PlanListService,
    private planListDetailService: PlanListDetailService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.searchForm = this.formBuilder.group({
      year: '',
      planListID: '',
      nameOfPlanList: '',
      createdDateStart: '',
      createdDateEnd: '',
      approvedDateStart: '',
      approvedDateEnd: '',
      planListDetailStatus1: false,
      planListDetailStatus2: false,
      planListDetailStatus3: false,
      planListDetailStatus4: false
    });

    this.userRole = localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.loadPlanListOptions();
    if (this.userRole === 'ADMIN') {
      this.getAllPlanListDetail1();
    }
    if (this.userRole !== 'ADMIN') {
      this.getAllPlanListDetail();
    }
    // this.searchForm = new FormGroup({
    //   productName: new FormControl(''),
    // });
  }

  getAllPlanListDetail() {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 2,
      length: 0,
    };
    this.onPageChange(initialPageEvent);
  }

  getAllPlanListDetail1() {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 2,
      length: 0,
    };
    this.onPageChange1(initialPageEvent);
  }

  search() {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 2,
      length: 0,
    };
    const formValues = this.searchForm.value;
    const checkValues = this.checkForm;
    if (formValues.year === checkValues.year &&
      formValues.planListID === checkValues.planListID &&
      formValues.nameOfPlanList === checkValues.nameOfPlanList &&
      formValues.createdDateStart === checkValues.createdDateStart &&
      formValues.createdDateEnd === checkValues.createdDateEnd &&
      formValues.approvedDateStart === checkValues.approvedDateStart &&
      formValues.approvedDateEnd === checkValues.approvedDateEnd &&
      formValues.planListDetailStatus1 === checkValues.planListDetailStatus1 &&
      formValues.planListDetailStatus2 === checkValues.planListDetailStatus2 &&
      formValues.planListDetailStatus3 === checkValues.planListDetailStatus3 &&
      formValues.planListDetailStatus4 === checkValues.planListDetailStatus4) {
      this.searchForm.setValue({
        year: '',
        planListID: '',
        nameOfPlanList: '',
        createdDateStart: '',
        createdDateEnd: '',
        approvedDateStart: '',
        approvedDateEnd: '',
        planListDetailStatus1: false,
        planListDetailStatus2: false,
        planListDetailStatus3: false,
        planListDetailStatus4: false
      });
    }
    this.onPageChange(initialPageEvent);
  }

  search1() {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 2,
      length: 0,
    };
    const formValues = this.searchForm.value;
    const checkValues = this.checkForm;
    if (formValues.year === checkValues.year &&
      formValues.planListID === checkValues.planListID &&
      formValues.nameOfPlanList === checkValues.nameOfPlanList &&
      formValues.createdDateStart === checkValues.createdDateStart &&
      formValues.createdDateEnd === checkValues.createdDateEnd &&
      formValues.approvedDateStart === checkValues.approvedDateStart &&
      formValues.approvedDateEnd === checkValues.approvedDateEnd &&
      formValues.planListDetailStatus1 === checkValues.planListDetailStatus1 &&
      formValues.planListDetailStatus2 === checkValues.planListDetailStatus2 &&
      formValues.planListDetailStatus3 === checkValues.planListDetailStatus3 &&
      formValues.planListDetailStatus4 === checkValues.planListDetailStatus4) {
      this.searchForm.setValue({
        year: '',
        planListID: '',
        nameOfPlanList: '',
        createdDateStart: '',
        createdDateEnd: '',
        approvedDateStart: '',
        approvedDateEnd: '',
        planListDetailStatus1: false,
        planListDetailStatus2: false,
        planListDetailStatus3: false,
        planListDetailStatus4: false
      });
    }
    this.onPageChange1(initialPageEvent);
  }

  // Hiển thị danh sách có phân trang
  onPageChange(event: PageEvent) {
    this.checkForm = this.searchForm.value;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.shoppingPlanService
      .advancedSearchPageable(this.searchForm.value.year, this.searchForm.value.planListID, this.searchForm.value.nameOfPlanList, this.searchForm.value.createdDateStart, this.searchForm.value.createdDateEnd, this.searchForm.value.approvedDateStart, this.searchForm.value.approvedDateEnd, this.searchForm.value.planListDetailStatus1, this.searchForm.value.planListDetailStatus2, this.searchForm.value.planListDetailStatus3, this.searchForm.value.planListDetailStatus4, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.planListDetail = data.content;
        this.totalItems = data.totalElements;
      });
  }

  onPageChange1(event: PageEvent) {
    this.checkForm = this.searchForm.value;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.shoppingPlanService
      .advancedSearchPageable1(this.searchForm.value.year, this.searchForm.value.planListID, this.searchForm.value.nameOfPlanList, this.searchForm.value.createdDateStart, this.searchForm.value.createdDateEnd, this.searchForm.value.approvedDateStart, this.searchForm.value.approvedDateEnd, this.searchForm.value.planListDetailStatus2, this.searchForm.value.planListDetailStatus3, this.searchForm.value.planListDetailStatus4, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.planListDetail = data.content;
        this.totalItems = data.totalElements;
      });
  }

  deletePlanListDetail(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa danh sách này?',
      text: 'Hành động này sẽ xóa danh sách và không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.planListDetailService.deletePlanListDetail(id).subscribe(
          (data: any) => {
            Swal.fire('Xóa thành công!', 'Danh sách đã được xóa.', 'success');
            window.location.reload();
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa danh sách.', 'error');
            window.location.reload();
          }
        );
      }
    });
  }


  // Chuyển status sang pending
  changePlanListStatusToPending(id: number) {
    Swal.fire({
      title: 'Xác nhận gửi yêu cầu',
      text: 'Bạn có muốn gửi yêu cầu phê duyệt danh sách này cho quản trị viên?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.planListDetailService.changePlanListStatusToPending(id).subscribe(
          (data: any) => {
            Swal.fire(
              'Gửi yêu cầu thành công!',
              'Yêu cầu đã được gửi.',
              'success'
            );
            setTimeout(() => {
              window.location.reload();
            }, 2000); // 2000 ms = 2 giây
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể gửi yêu cầu.', 'error');
          }
        );
      }
    });
  }

  // Chuyển status sang approved với quyền admin
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

  // Chuyển status sang cancelled với quyền admin
  changeProductStatusToCancelled(id: number) {
    Swal.fire({
      title: 'Xác nhận từ chối phê duyệt kế hoạch',
      text: 'Bạn có muốn từ chối phê duyệt kế hoạch này?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.planListDetailService.changeProductStatusToCancelled(id).subscribe(
          (data: any) => {
            Swal.fire(
              'Từ chối thành công!',
              'Kế hoạch đã được từ chối.',
              'success'
            );
            setTimeout(() => {
              window.location.reload();
            }, 2000); // 2000 ms = 2 giây
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể hủy kế hoạch.', 'error');
          }
        );
      }
    });
  }

  // Lấy danh sách plan
  loadPlanListOptions() {
    this.planListService.getAllPlanList().subscribe((data: any) => {
      this.planListOptions = Object.values(data);
    });
  }

  // Xuất excel
  exportToExcel() {
    this.shoppingPlanService.getAllShoppingPlans().subscribe((data: any) => {
      this.shoppingPlanListNotPageable = data;
      console.log(data);

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
        'Loại tiền': item.currencies[0].currencyUnit,
        'Trạng thái': item.status,
        'Người tạo': item.createdBy,
        'Ngày tạo': this.formatLocalDate(item.createdDateTime),
        'Ghi chú': item.description,
      }));

      const worksheet: XLSX.WorkSheet =
        XLSX.utils.json_to_sheet(selectedFields);

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
    });
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

  openDialogSearch(): void {
    const dialogRef = this.dialog.open(SearchShoppingPlanComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.searchForm = result.searchForm;
      if (this.userRole === 'ADMIN') {
        this.getAllPlanListDetail1();
      }
      if (this.userRole !== 'ADMIN') {
        this.getAllPlanListDetail();
      }
    });
  }


  // Format ngày tháng năm để xuất excel
  private formatLocalDate(dateArray: number[]): string {
    const parsedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    if (isDate(parsedDate)) {
      return format(parsedDate, 'dd/MM/yyyy');
    } else {
      return '';
    }
  }

  formatPlanLists(planLists) {
    if (planLists && planLists.length > 0) {
      return planLists.map((plan) => plan.name).join(', ');
    } else {
      return '';
    }
  }
}
