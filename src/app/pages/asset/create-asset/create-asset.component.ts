import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlanList } from 'src/app/domain/PlanList';
import { Asset } from 'src/app/domain/asset';
import { AssetService } from 'src/app/service/asset.service';
import { PlanListService } from 'src/app/service/PlanList.service';
import {PlanListDetailService} from '../../../service/PlanListDetail.service';
import {PlanListDetail} from '../../../domain/PlanListDetail';
import {ShoppingPlanService} from '../../../service/ShoppingPlan.service';
import {ShoppingPlan} from '../../../domain/ShoppingPlan';
import {Unit} from '../../../domain/Unit';
import {UnitService} from '../../../service/UnitService';
import {Contract} from '../../../domain/Contract';
import {Supplier} from '../../../domain/Supplier';
import {SupplierService} from '../../../service/Supplier.service';
import {Manufacturer} from '../../../domain/Manufacturer';
import {ManufacturerService} from '../../../service/Manufacturer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {
  selectedProduct: any;
  selectedLicenseType: string = '';
  selectedSupplier: any;
  selectedManufacturer: any;
  selectedUnitId: any;
  asset: Asset = new Asset();
  contract: Contract = new Contract();
  supplier: Supplier = new Supplier();
  manufacturer: Manufacturer = new Manufacturer();
  selectedPlanDetailId: any;
  shoppingPlanList: ShoppingPlan[] | any = [];
  submitting = false;
  selectedYear: any;
  planListDetailOptions: PlanListDetail[] | any = [];
  planListOptions: PlanList[] | any = [];
  supplierList: Supplier[] | any = [];
  manufacturerList: Manufacturer[] | any = [];
  shoppingPlan: any = {
    productTypeDetails: [{
      productTypes: [{
        type: ''
      }],
      typeDetail: ''
    }],
  };
  unitOptions: Unit[] | any = [];
  constructor(
    private shoppingPlanService: ShoppingPlanService,
    private assetService: AssetService,
    protected router: Router,
    private planListService: PlanListService,
    private planListDetailService: PlanListDetailService,
    private unitService: UnitService,
    private supplierService: SupplierService,
    private manufacturerService: ManufacturerService,
  ) {}

  ngOnInit(): void {
    this.loadPlanListOptions();
    this.loadUnitOptions();
    this.loadSupplierOptions();
    this.loadManufacturerOptions();
  }
  onLicenseTypeChange(event: any) {
    this.selectedLicenseType = event.target.value;
  }
  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.planListDetailService
      .getPlansListDetailByYear(this.selectedYear)
      .subscribe((plans) => {
        this.planListDetailOptions = plans;
      });
  }
  onProductChange(event: any) {
    this.selectedProduct = event.target.value;
    this.shoppingPlanService
      .getShoppingPlan(this.selectedProduct)
      .subscribe((data) => {
        this.shoppingPlan = data;
      });
  }
  loadSupplierInfo(event: any) {
    this.selectedSupplier = event.target.value;
    this.supplierService
      .getSupplierById(this.selectedSupplier)
      .subscribe((data) => {
        this.supplier = data;
      });
  }
  loadManufacturerInfo(event: any) {
    this.selectedManufacturer = event.target.value;
    this.manufacturerService
      .getManufacturerById(this.selectedManufacturer)
      .subscribe((data) => {
        this.manufacturer = data;
      });
  }

  loadUnitOptions(){
    this.unitService.getAllUnit().subscribe((data: any) => {
      this.unitOptions = Object.values(data);
    });
  }
  loadManufacturerOptions(){
    this.manufacturerService.getAllManufacturerNotPageable().subscribe((data: any) => {
      this.manufacturerList = Object.values(data);
    });
  }

  loadSupplierOptions(){
    this.supplierService.getAllSupplierNotPageable().subscribe((data: any) => {
      this.supplierList = Object.values(data);
    });
  }
  onUnitChange(event: any) {
    this.selectedUnitId = event.target.value;
  }
  onPlanChange(event: any) {
    this.selectedPlanDetailId = event.target.value;
    this.shoppingPlanService.getShoppingPlanByPlanListDetailNotPagination(this.selectedPlanDetailId).subscribe((data) => {
      this.shoppingPlanList = data;
    });
  }
  async onSubmit() {
    if (this.submitting) {
      return;
    }
    this.submitting = true;

    const data = {
      itemCodeKt: this.asset.itemCodeKt,
      shoppingPlanId: this.selectedProduct,
      serial: this.asset.serial,
      assetName: this.asset.assetName,
      specifications: this.asset.specifications,
      productOrigin: this.asset.productOrigin,
      description: this.asset.description,
      unitIds: [parseInt(this.selectedUnitId)],
      quantity: this.asset.quantity,
      price: this.asset.price,
      assetLicenceStatus: this.selectedLicenseType,
      licenceDuration: this.asset.licenceDuration,
      dayStartedUsing: this.asset.dayStartedUsing,
      contractName: this.contract.contractName,
      contractCode: this.contract.contractCode,
      archiveLink: this.contract.archiveLink,
      contractStartDate: this.contract.contractStartDate,
      contractEndDate: this.contract.contractEndDate,
      warrantyPeriod: this.contract.warrantyPeriod,
      warrantyStartDate: this.contract.warrantyStartDate,
      warrantyEndDate: this.contract.warrantyEndDate,
      attachedFiles: this.contract.attachedFiles,
      supplierIds: [parseInt(this.selectedSupplier)],
      manufacturerIds: [parseInt(this.selectedManufacturer)],
      lookingUpInformation: this.asset.lookingUpInformation
    };

    console.log(data);

    this.assetService.createAsset(data).subscribe(
      (dataa) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thêm tài sản thành công!',
        }).then(() => {
          // @ts-ignore
          this.router.navigate('/admin/asset');
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thêm tài sản thất bại. Vui lòng kiểm tra lại',
        });
      }
    );
    // try {
    //   const datas = await this.assetService.createAsset(data).toPromise();
    //
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Thành công',
    //     text: 'Thêm tài sản thành công!',
    //   });
    //   // @ts-ignore
    //   await this.router.navigate('/admin/asset');
    // } catch (error) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Lỗi',
    //     text: 'Thêm tài sản thất bại. Vui lòng kiểm tra lại',
    //   });
    // } finally {
    //   this.submitting = false;
    // }
  }
  loadPlanListOptions() {
    this.planListService.getAllPlanList().subscribe((data: any) => {
      this.planListOptions = Object.values(data);
      console.log(this.planListOptions);
    });
  }

  isButtonDisabled(): boolean {
    return (
      !this.asset.itemCodeKt ||
      !this.selectedProduct ||
      !this.asset.serial ||
      !this.asset.assetName ||
      !this.asset.specifications ||
      !this.asset.productOrigin ||
      !this.asset.description ||
      !this.selectedUnitId ||
      !this.asset.quantity ||
      !this.asset.price ||
      !this.selectedLicenseType ||
      !this.asset.licenceDuration ||
      !this.asset.dayStartedUsing ||
      !this.contract.contractName ||
      !this.contract.contractCode ||
      !this.contract.archiveLink ||
      !this.contract.contractStartDate ||
      !this.contract.contractEndDate ||
      !this.contract.warrantyPeriod ||
      !this.contract.warrantyStartDate ||
      !this.contract.warrantyEndDate ||
      !this.selectedSupplier ||
      !this.selectedManufacturer ||
      !this.asset.lookingUpInformation
    );
  }
}
