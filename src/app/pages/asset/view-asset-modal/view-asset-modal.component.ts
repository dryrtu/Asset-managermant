import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { Asset } from 'src/app/domain/asset';
import { AssetService } from 'src/app/service/asset.service';
import {Contract} from '../../../domain/Contract';
import {Supplier} from '../../../domain/Supplier';
import {Manufacturer} from '../../../domain/Manufacturer';
import {ShoppingPlan} from '../../../domain/ShoppingPlan';
import {PlanListDetail} from '../../../domain/PlanListDetail';
import {PlanList} from '../../../domain/PlanList';
import {Unit} from '../../../domain/Unit';

@Component({
  selector: 'app-view-asset-modal',
  templateUrl: './view-asset-modal.component.html',
  styleUrls: ['./view-asset-modal.component.css']
})
export class ViewAssetModalComponent implements OnInit {

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
    private assetService: AssetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadAssetById(id);
  }
  loadAssetById(id: number) {
    this.assetService.getAssetById(id).subscribe(data => {
      this.asset = data;
      console.log(this.asset);
    }, error => console.log(error));
  }
}
