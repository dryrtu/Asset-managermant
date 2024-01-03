import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanList } from 'src/app/domain/PlanList';
import { PlanListDetail } from 'src/app/domain/PlanListDetail';
import { PlanListService } from 'src/app/service/PlanList.service';
import { PlanListDetailService } from 'src/app/service/PlanListDetail.service';

@Component({
  selector: 'app-search-shopping-plan',
  templateUrl: './search-shopping-plan.component.html',
  styleUrls: ['./search-shopping-plan.component.css']
})
export class SearchShoppingPlanComponent implements OnInit {
  selectAll: boolean;
  selectedYear: any;
  planListOptions: PlanList[] | any = [];
  planListDetailOptions: PlanListDetail[] | any = [];
  planListDetail: PlanListDetail[] | any = [];
  note: boolean[] | any = [];
  pageIndex: number;
  pageSize: number;
  totalItems: any;
  userRole: string;

  constructor(
    private formBuilder: FormBuilder,
    private planListDetailService: PlanListDetailService,
    private planListService: PlanListService,
    public dialogRef: MatDialogRef<SearchShoppingPlanComponent>
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

  searchForm: FormGroup;

  ngOnInit(): void {
    this.loadPlanListOptions();
    this.selectAll = false;
  }

  onSubmit() {
    console.log(this.searchForm);
    this.dialogRef.close({ searchForm: this.searchForm });
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.planListDetailService
      .getPlansListDetailByYear(this.selectedYear)
      .subscribe((plans) => {
        this.planListDetailOptions = plans;
      });
  }

  loadPlanListOptions() {
    this.planListService.getAllPlanList().subscribe((data: any) => {
      this.planListOptions = Object.values(data);
      console.log(this.planListOptions);
    });
  }

  toggleAllCheckboxes() {
    if (this.selectAll) {
      this.selectAll = true;
      this.searchForm.patchValue({
        planListDetailStatus1: true,
        planListDetailStatus2: true,
        planListDetailStatus3: true,
        planListDetailStatus4: true,
      });
    } else {
      this.selectAll = false;
      this.searchForm.patchValue({
        planListDetailStatus1: false,
        planListDetailStatus2: false,
        planListDetailStatus3: false,
        planListDetailStatus4: false,
      });
    }
  }

  checkAll(){
    if (this.searchForm.value.planListDetailStatus1 === false ||
      this.searchForm.value.planListDetailStatus2 === false ||
      this.searchForm.value.planListDetailStatus3 === false ||
      this.searchForm.value.planListDetailStatus4 === false) {
      this.selectAll = false;
    }
  }


  makeNewSearchForm() {
    this.selectAll = false;
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

  // dateRangeValidator() {
  //   const createdDateStart = this.searchForm.get('createdDateStart').value;
  //   const createdDateEnd = this.searchForm.get('createdDateEnd').value;
  //
  //   // Check and handle created date range
  //   if (createdDateStart && createdDateEnd) {
  //     const startDate = new Date(createdDateStart);
  //     const endDate = new Date(createdDateEnd);
  //     if (startDate > endDate) {
  //       return this.note = true;
  //     } else {
  //       return this.note = false;
  //     }
  //   }
  // }
  // dateRangeValidator1() {
  //   const approvedDateStart = this.searchForm.get('approvedDateStart').value;
  //   const approvedDateEnd = this.searchForm.get('approvedDateEnd').value;
  //
  //   if (approvedDateStart && approvedDateEnd) {
  //     const startDate = new Date(approvedDateStart);
  //     const endDate = new Date(approvedDateEnd);
  //     if (startDate > endDate) {
  //       return this.note1 = true;
  //     } else {
  //       return this.note1 = false;
  //     }
  //   }
  // }
  dateRangeValidator(startControlName: string, endControlName: string, i: number) {
    const startDate = this.searchForm.get(startControlName).value;
    const endDate = this.searchForm.get(endControlName).value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        return this.note[i] = true;
      }
    }

    return this.note[i] = false;
  }
}
