import { Component, OnInit } from '@angular/core';
import {AssetService} from '../../../service/asset.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-asset',
  templateUrl: './search-asset.component.html',
  styleUrls: ['./search-asset.component.css']
})
export class SearchAssetComponent implements OnInit {
  selectAll = false;
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SearchAssetComponent>
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

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close({ searchForm: this.searchForm });
  }

  toggleAllCheckboxes() {
    if (this.selectAll) {
      this.selectAll = false;
      this.searchForm.patchValue({
        assetStatus1: false,
        assetStatus2: false
      });
    } else {
      this.selectAll = true;
      this.searchForm.patchValue({
        assetStatus1: true,
        assetStatus2: true
      });
    }
  }

  checkAll(){
    if (this.searchForm.value.assetStatus1 === false ||
      this.searchForm.value.assetStatus2 === false) {
      this.selectAll = false;
    }
  }

  new() {
    this.selectAll = false;
    this.searchForm.patchValue({
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


}
