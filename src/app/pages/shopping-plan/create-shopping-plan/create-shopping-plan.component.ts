import { Component, DoCheck, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PlanList } from 'src/app/domain/PlanList';
import { ShoppingPlan } from 'src/app/domain/ShoppingPlan';
import { ShoppingPlanService } from 'src/app/service/ShoppingPlan.service';
import { PlanListService } from 'src/app/service/PlanList.service';
import { FormGroup } from '@angular/forms';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';
import { ProductTypeDetailService } from 'src/app/service/ProductTypeDetail.service';
import { ProductTypeDetail } from 'src/app/domain/ProductTypeDetail';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductTypeService } from 'src/app/service/ProductType.service';
import { Unit } from 'src/app/domain/Unit';
import { Currency } from 'src/app/domain/Currency';
import { UnitService } from 'src/app/service/UnitService';
import { CurrencyService } from 'src/app/service/CurrencyService';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CreatePlanListDetailComponent } from '../../plan-list/create-plan-list-detail/create-plan-list-detail.component';
import {ShoppingPlanComponent} from '../shopping-plan.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-shopping-plan',
  templateUrl: './create-shopping-plan.component.html',
  styleUrls: ['./create-shopping-plan.component.css'],
})
export class CreateShoppingPlanComponent implements OnInit {

  constructor(
    private shoppingPlanService: ShoppingPlanService,
    private planListService: PlanListService,
    protected router: Router,
    private planListDetailService: PlanListDetailService,
    private productTypeDetailService: ProductTypeDetailService,
    private productTypeService: ProductTypeService,
    private unitService: UnitService,
    private currencyService: CurrencyService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}
  myGroup: FormGroup;
  selectedProductTypeId: any;
  selectedUnitId: any;
  selectedCurrencyId: any;
  selectedProductTypeDetailId: any;
  selectedYear: any;
  selectedPlanDetailId: any;
  submitting = false;
  totalAmount: any;

  shoppingPlan: ShoppingPlan = new ShoppingPlan();

  planListOptions: PlanList[] | any = [];
  planListDetailOptions: PlanListDetail[] | any = [];
  productTypeOptions: ProductType[] | any = [];
  productTypeDetailOptions: ProductTypeDetail[] | any = [];
  unitOptions: Unit[] | any = [];
  currencyOptions: Currency[] | any = [];
  importPlanListDetail: PlanListDetail[] | any = [];


shoppingPlanList: ShoppingPlan[] | any = [];


  ngOnInit(): void {
    this.loadPlanListOptions();
    this.loadProductTypeOptions();
    this.loadUnitOptions();
    this.loadCurrencyOptions();
  }

  async onSubmit() {
    if (this.submitting) {
      return;
    }
    this.submitting = true;

    const data = {
      productName: this.shoppingPlan.productName,
      productTypeDetailId: [parseInt(this.selectedProductTypeId)],
      unitId: [parseInt(this.selectedUnitId)],
      currencyId: [parseInt(this.selectedCurrencyId)],
      quantity: this.shoppingPlan.quantity,
      expectedPrice: this.shoppingPlan.expectedPrice,
      description: this.shoppingPlan.description,
      planListDetailId: [parseInt(this.selectedPlanDetailId)],
    };

    try {
      const datas = await this.shoppingPlanService.createShoppingPlan(data).toPromise();

      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Tạo mới sản phẩm thành công!',
      });

      await this.addToShoppingPlanList();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Tạo mới sản phẩm thất bại. Vui lòng kiểm tra lại',
      });
    } finally {
      this.submitting = false;
    }
  }

  async addToShoppingPlanList() {
    const data = await this.shoppingPlanService.getDefaultTemplate(this.selectedPlanDetailId).toPromise();
    this.shoppingPlanList = data;
  }

goBack(): void {
  // Kiểm tra xem có đối tượng nào có isDraft là true hay không
  const hasDraft = this.shoppingPlanList.some((plan) => plan.isDraft === true);

  if (hasDraft) {
    Swal.fire({
      icon: 'question',
      title: 'Unsaved Changes',
      text: 'There are unsaved changes. Do you want to save?',
      showCancelButton: true,
      confirmButtonText: 'Yes, save changes',
      cancelButtonText: 'No, discard changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.savePlanList();
      } else {
        this.goBackWithoutSaving();
      }
    });
  } else {
    this.goBackWithoutSaving();
  }
}


goBackWithoutSaving(): void {
  console.log('Going back without saving');
}

  savePlanList() {
    this.shoppingPlanService.updateDraftStatus(this.selectedPlanDetailId).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Kế hoạch đã được lưu thành công.',
        }).then(() => {
          this.router.navigate(['/admin/danh-muc-mua-sam']);
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Vui lòng tạo mới danh mục mua sắm.',
        }).then(() => {
          this.submitting = false;
        });
      }
    );
}

  clearForm() {
    // this.shoppingPlan = {
    //   productName: '',
    //   productTypeDetails: null,
    //   units: null,
    //   quantity: null,
    //   // totalAmount: null,
    //   expectedPrice: null,
    //   currencies: null,
    //   description: ''
    // };
  }

  deleteShoppingPlan(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      text: 'Hành động này sẽ xóa sản phẩm và không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingPlanService.deleteShoppingPlan(id).subscribe(
          (data: any) => {
            console.log(data);
            Swal.fire('Xóa thành công!', 'Sản phẩm đã được xóa.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 2000); // 2000 ms = 2 giây
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa sản phẩm.', 'error');
          }
        );
      }
    });
  }

openDialogCreatePlanListDetail(): void {
  const dialogRef = this.dialog.open(CreatePlanListDetailComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

  onPlanChange(event: any) {
    this.selectedPlanDetailId = event.target.value;
    this.shoppingPlanService.getShoppingPlanByPlanListDetailNotPagination(this.selectedPlanDetailId).subscribe((data) => {
      this.shoppingPlanList = data;
    });
  }

  onProductTypeChange(event: any) {
    this.selectedProductTypeId = event.target.value;
    this.productTypeDetailService
      .getProductTypeDetailByType(this.selectedProductTypeId)
      .subscribe((typeDetails) => {
        this.productTypeDetailOptions = typeDetails;
      });
  }

  onProductTypeDetailChange(event: any) {
    this.selectedProductTypeDetailId = event.target.value;
  }

  onUnitChange(event: any) {
    this.selectedUnitId = event.target.value;
  }

  onCurrencyChange(event: any) {
    this.selectedCurrencyId = event.target.value;
    this.totalAmount = this.shoppingPlan.quantity * this.shoppingPlan.expectedPrice;
  }

  goToShoppingPlanList() {
    this.router.navigate(['/admin/danh-muc-mua-sam']);
    window.location.reload();
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.planListDetailService
      .getPlansListDetailByYear(this.selectedYear)
      .subscribe((plans) => {
        this.planListDetailOptions = plans;
      });
  }

  // Lấy danh sách plan
  loadPlanListOptions() {
    this.planListService.getAllPlanList().subscribe((data: any) => {
      this.planListOptions = Object.values(data);
    });
  }

  // Lấy danh sách product type
  loadProductTypeOptions() {
    this.productTypeService.getAllProductType().subscribe((data: any) => {
      this.productTypeOptions = Object.values(data);
    });
  }

  // Lấy danh sách đơn vị tính
  loadUnitOptions(){
    this.unitService.getAllUnit().subscribe((data: any) => {
      this.unitOptions = Object.values(data);
    });
  }

  // Lấy danh sách tiền tệ
  loadCurrencyOptions(){
    this.currencyService.getAllCurrency().subscribe((data: any) => {
      this.currencyOptions = Object.values(data);
    });
  }

  isButtonDisabled(): boolean {
    return (
      !this.selectedYear ||
      !this.selectedPlanDetailId ||
      !this.shoppingPlan.productName ||
      !this.selectedProductTypeId ||
      !this.selectedProductTypeDetailId ||
      !this.shoppingPlan.quantity ||
      !this.selectedUnitId ||
      !this.shoppingPlan.description ||
      !this.selectedCurrencyId
    );
  }

  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('Không thể sử dụng nhiều file'); }

    const fileName: string = target.files[0].name;

    if (!(fileName.endsWith('.xlsx') || fileName.endsWith('.xls'))) {
      throw new Error('Định dạng tập tin không hợp lệ. Chỉ cho phép tệp .xlsx hoặc .xls');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = this.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new PlanListDetail());
      const importedData = data.slice(1, -1);

      this.importPlanListDetail = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as PlanListDetail;
      });

    };
    reader.readAsBinaryString(target.files[0]);

  }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as XLSX.AOA2SheetOpts;

    return data;
  }
}
