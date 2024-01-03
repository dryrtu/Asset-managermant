import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { PlanList } from 'src/app/domain/PlanList';
import { Supplier } from 'src/app/domain/Supplier';
import { ShoppingPlanService } from 'src/app/service/ShoppingPlan.service';
import { SupplierService } from 'src/app/service/Supplier.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-add-to-asset',
  templateUrl: './add-to-asset.component.html',
  styleUrls: ['./add-to-asset.component.css'],
  providers: [CurrencyPipe],
})
export class AddToAssetComponent implements OnInit {

  isSubmitting: boolean = false;
  planListOptions: PlanList[];
  selectedPlanId: any;
  warrantyExpirationDate: any;
  deliveryRequestDate: any;
  equipmentServiceReplacementDate: any;
  supplierOptions: Supplier[];
  shoppingPlan = {
    productName: '',
    itemCode: '',
    contractCode: '',
    contractName: '',
    warrantyPeriod: '',
    productOrigin: '',
    description:'',
    warrantyStartDate:'',
    price:''
  };
  selectedSuppilerId: any;

  constructor(
    private shoppingPlanService: ShoppingPlanService,
    private router: Router,
    private suppilerService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getShoppingPlanById();
    this.loadSupplierList();
  }

  getShoppingPlanById() {
    const productId = this.data.productId;
    this.shoppingPlanService.getShoppingPlan(productId).subscribe((result: any) => {
      this.shoppingPlan = result;
      console.log(this.shoppingPlan)
    });
  }


  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }
  
    this.isSubmitting = true;

    const data = {
      itemCode: this.shoppingPlan.itemCode,
      price: this.shoppingPlan.price,
      contractCode: this.shoppingPlan.contractCode,
      contractName: this.shoppingPlan.contractName,
      productOrigin: this.shoppingPlan.productOrigin,
      supplierId: [parseInt(this.selectedSuppilerId)],
      warrantyPeriod: this.shoppingPlan.warrantyPeriod,
      warrantyStartDate: this.shoppingPlan.warrantyStartDate
    };

    const productId = this.data.productId;

    this.shoppingPlanService.changeProductStatusToDoneAndAddToAssetList(productId, data).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Sản phẩm đã được lưu vào Tài sản thành công.',
        }).then(() => {
          this.router.navigate(['/admin/assets']);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thông tin không hợp lệ.',
        });
      }
    ).add(() => {
      this.isSubmitting = false;
    });
  }


  getSuppilerId(event: any) {
    this.selectedSuppilerId = event.target.value;
  }

   // Lấy danh sách nhà cung cấp
   loadSupplierList() {
    this.suppilerService.getAllSupplierNotPageable().subscribe((data: any) => {
      this.supplierOptions = Object.values(data);
      console.log(this.supplierOptions)
    });
  }

}
