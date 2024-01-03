import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Asset } from 'src/app/domain/asset';
import { AssetService } from 'src/app/service/asset.service';
import { PageEvent } from '@angular/material/paginator';
import { ShoppingPlanService } from 'src/app/service/ShoppingPlan.service';
import { PlanList } from 'src/app/domain/PlanList';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlanListService } from 'src/app/service/PlanList.service';
import { Router, NavigationEnd } from '@angular/router';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import Swal from 'sweetalert2';
import {SearchAssetComponent} from './search-asset/search-asset.component';
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css'],
})
export class AssetComponent implements OnInit {
  assetList: Asset[] | any = [];
  planListOptions: PlanList[] | any = [];
  searchForm: FormGroup;
  pageIndex: number;
  pageSize: number;
  totalItems: any;
  shoppingPlanList: any;

  constructor(
    private assetService: AssetService,
    private planListService: PlanListService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.searchForm = this.formBuilder.group({
      itemCode: '',
      nameAsset: '',
      nameOfPlanList: '',
      supplierName: '',
      licenseDateStart: '',
      licenseDateEnd: '',
      warrantyPeriodStart: '',
      warrantyPeriodEnd: '',
      assetStatus1: false,
      assetStatus2: false
    });
  }

  // Tìm kiếm
  getAllAsset() {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 0,
    };
    console.log(this.searchForm);
    this.onPageChange(initialPageEvent);
  }

  async changeAssetStatus(id: number) {
    Swal.fire({
      title: 'Xác nhận gửi yêu cầu',
      text: 'Bạn có muốn thay đổi trạng thái tài sản?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const datas = await this.assetService.changeAssetStatus(id).toPromise();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Thay đổi trạng thái thành công!',
          });
          await this.showAsset();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể thay đổi trạng thái ngay lúc này',
          });
        }
      }
    });
  }

  async showAsset() {
    this.assetService
      .advancedSearchh(this.searchForm.value.itemCode, this.searchForm.value.nameAsset, this.searchForm.value.nameOfPlanList, this.searchForm.value.supplierName, this.searchForm.value.licenseDateStart, this.searchForm.value.licenseDateEnd, this.searchForm.value.warrantyPeriodStart, this.searchForm.value.warrantyPeriodEnd, this.searchForm.value.assetStatus1, this.searchForm.value.assetStatus2, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.assetList = data.content;
        this.totalItems = data.totalElements;
      });
  }

  ngOnInit(): void {
    this.getAllAsset();
  }

  // Hiển thị danh sách có phân trang
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.assetService
      .advancedSearchh(this.searchForm.value.itemCode, this.searchForm.value.nameAsset, this.searchForm.value.nameOfPlanList, this.searchForm.value.supplierName, this.searchForm.value.licenseDateStart, this.searchForm.value.licenseDateEnd, this.searchForm.value.warrantyPeriodStart, this.searchForm.value.warrantyPeriodEnd, this.searchForm.value.assetStatus1, this.searchForm.value.assetStatus2, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.assetList = data.content;
        this.totalItems = data.totalElements;
      });
    console.log(this.assetList);
  }

  openDialogSearch(): void {
    const dialogRef = this.dialog.open(SearchAssetComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.searchForm = result.searchForm;
      this.getAllAsset();
    });
  }

}
