import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanList } from 'src/app/domain/PlanList';
import { ShoppingPlanService } from 'src/app/service/ShoppingPlan.service';
import { PlanListService } from 'src/app/service/PlanList.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import { Currency } from 'src/app/domain/Currency';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductTypeDetail } from 'src/app/domain/ProductTypeDetail';
import { Unit } from 'src/app/domain/Unit';
import { CurrencyService } from 'src/app/service/CurrencyService';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';
import { ProductTypeService } from 'src/app/service/ProductType.service';
import { ProductTypeDetailService } from 'src/app/service/ProductTypeDetail.service';
import { UnitService } from 'src/app/service/UnitService';
import { ShoppingPlan } from 'src/app/domain/ShoppingPlan';
import { ShoppingPlanHistory } from 'src/app/domain/ShoppingPlanHistory';
import {UpdatePlanListDetailComponent} from '../../plan-list/update-plan-list-detail/update-plan-list-detail.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-shopping-plan',
  templateUrl: './update-shopping-plan.component.html',
  styleUrls: ['./update-shopping-plan.component.css'],
})
export class UpdateShoppingPlanComponent implements OnInit {
  shoppingPlan: ShoppingPlan[] | any = [];
  id: number;
  data: any;
  selectedProductTypeId: any;
  selectedUnit: any;
  selectedCurrency: any;
  selectedYear: any;
  selectedType: any;
  selectedTypeDetail: any;
  planListOptions: PlanList[] | any = [];
  productTypeOptions: ProductType[] | any = [];
  productTypeDetailOptions: ProductTypeDetail[] | any = [];
  unitOptions: Unit[] | any = [];
  currencyOptions: Currency[] | any = [];
  selectedProductId: any;
  planListDetail: PlanListDetail[] | any = [];
  shoppingPlanList: ShoppingPlan[] | any = [];
  planList: any[] = [];
  productTypeDetails: any[] = [];
  defaultTypeId: any;
  unitId: any;
  currencyId: any;
  defaultTypeDetailId: any;
  selectedTypeDetailId: any;
  constructor(
    private shoppingPlanService: ShoppingPlanService,
    private route: ActivatedRoute,
    private router: Router,
    private planListService: PlanListService,
    private planListDetailService: PlanListDetailService,
    private productTypeDetailService: ProductTypeDetailService,
    private productTypeService: ProductTypeService,
    private unitService: UnitService,
    private currencyService: CurrencyService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadPlanListDetailById(id);
    this.loadProductList(id);
  }
  onProductTypeChange(event: any) {
    this.selectedProductTypeId = this.selectedType.id;
    this.productTypeDetailService
      .getProductTypeDetailByType(this.selectedProductTypeId)
      .subscribe((typeDetailsData) => {
        if (typeDetailsData.length > 0) {
          this.productTypeDetailOptions = [{ id: 0, typeDetail: '--Chọn--' }, ...typeDetailsData];
          this.selectedTypeDetail = this.productTypeDetailOptions[0];
        } else {
          this.productTypeDetailOptions = [];
          this.selectedTypeDetail = null;
        }
      });
  }


  loadProDuctTypeDetail(defaultTypeId: any) {
    this.productTypeDetailService
      .getProductTypeDetailByType(this.defaultTypeId)
      .subscribe((typeDetails) => {
        this.productTypeDetailOptions = typeDetails;
        this.selectedTypeDetail = this.productTypeDetailOptions.find(type => type.id === this.defaultTypeDetailId);
        console.log(this.selectedTypeDetail);
      });
  }

  updatePlanListDetail(id: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id };

    const dialogRef = this.dialog.open(UpdatePlanListDetailComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateShoppingPlan() {
    console.log(this.selectedTypeDetailId);
    const data = {
      productName: this.shoppingPlan.productName,
      unitId: [parseInt(this.shoppingPlan.units[0].id)],
      productTypeDetailId: [parseInt(this.selectedTypeDetailId)],
      currencyId: [parseInt(this.shoppingPlan.currencies[0].id)],
      quantity: this.shoppingPlan.quantity,
      expectedPrice: this.shoppingPlan.expectedPrice,
      description: this.shoppingPlan.description,
    };
    console.log(data);
    this.shoppingPlanService.updateShoppingPlan(this.shoppingPlan.id, data).subscribe(
        (responseData) => {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Cập nhật thành công!',
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Có lỗi xảy ra!.',
          });
        }
    );
  }

  getTypeDetailId(id: number) {
    this.selectedTypeDetailId = this.selectedTypeDetail.id;
    console.log(this.selectedTypeDetailId);
  }

  // Lấy danh sách product type
  loadProductTypeOptions() {
    this.productTypeService.getAllProductType().subscribe((data: any) => {
      this.productTypeOptions = Object.values(data);
      this.selectedType = this.productTypeOptions.find(type => type.id === this.defaultTypeId);
      console.log(this.selectedType);
    });
  }

  // Lấy danh sách đơn vị tính
  loadUnitOptions() {
    this.unitService.getAllUnit().subscribe(data => {
      this.unitOptions = Object.values(data);
      this.selectedUnit = this.unitOptions.find(unit => unit.id === this.unitId);
      console.log(this.selectedUnit);
    });
  }

  // Lấy danh sách tiền tệ
  loadCurrencyOptions() {
    this.currencyService.getAllCurrency().subscribe(data => {
      this.currencyOptions = Object.values(data);
      this.selectedCurrency = this.currencyOptions.find(currency => currency.id === this.currencyId);
      console.log(this.selectedCurrency);
    });
  }

  loadPlanListDetailById(id: number) {
    this.planListDetailService.getPlanListDetailByIdd(id).subscribe(data => {
      this.planListDetail = data;
      // this.defaultPlanId = data.planList[0].id;
    }, error => console.log(error));
  }

  loadProductList(id: number) {
    this.shoppingPlanService.getShoppingPlanByPlanListDetailNotPagination(id).subscribe(data => {
      this.shoppingPlanList = data;
    }, error => console.log(error));
  }

  showProduct(event: any) {
    this.selectedProductId = event.target.value;
    this.shoppingPlanService.getShoppingPlan(this.selectedProductId).subscribe(data => {
      this.shoppingPlan = data;
      console.log(this.shoppingPlan);
      this.defaultTypeId = data.productTypeDetails[0].productTypes[0].id;
      this.defaultTypeDetailId = data.productTypeDetails[0].id;
      this.unitId = data.units[0].id;
      this.currencyId = data.currencies[0].id;
      this.loadProductTypeOptions();
      this.loadProDuctTypeDetail(this.defaultTypeId);
      this.loadUnitOptions();
      this.loadCurrencyOptions();
    });
  }
}
