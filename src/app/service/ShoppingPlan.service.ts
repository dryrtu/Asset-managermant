import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ShoppingPlan } from '../domain/ShoppingPlan';
import { Page } from '../domain/pageable';
import { PlanListDetail } from '../domain/PlanListDetail';
import { catchError } from 'rxjs/operators';
import { LocalDate } from '@js-joda/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingPlanService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/shopping-plan';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  getAllShoppingPlans(): Observable<ShoppingPlan[]> {
    return this.http.get<ShoppingPlan[]>(
      this.baseURL + '/get-all-shopping-plan-not-pageable',
      {
        headers: this.headers,
      }
    );
  }

  // Gọi tới api lấy danh sách sp
  getShoppingPlanList(
    page: number,
    size: number
  ): Observable<Page<ShoppingPlan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<ShoppingPlan>>(
      `${this.baseURL}/get-all-shopping-plan`,
      options
    );
  }

  updateDraftStatus(idPlanListDetail): Observable<Object> {
    return this.http.put(
      `${this.baseURL}/update-draft-status?idPlanListDetail=${idPlanListDetail}`,
      { headers: this.headers }
    );
  }

  // Xóa sp
  deleteShoppingPlan(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-shopping-plan/${id}`, {
      headers: this.headers,
    });
  }

  // Chuyển sang tài sản
  changeProductStatusToPending(id: number): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-product-status-to-pending?id=${id}&status=Chờ phê duyệt`,
      { headers: this.headers }
    );
  }

  // ADMIN phê duyệt
  changeProductStatusToApproved(id: number): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-product-status-to-approved?id=${id}&status=Đã phê duyệt`,
      { headers: this.headers }
    );
  }

  // ADMIN cancelled
  changeProductStatusToCancelled(id: number): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-product-status-to-cancelled?id=${id}&status=Đã hủy`,
      { headers: this.headers }
    );
  }

  changeProductStatusToDoneAndAddToAssetList(
    id: number,
    data: any
  ): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-product-status-to-done?id=${id}&status=Đã xong`,
      data,
      { headers: this.headers }
    );
  }

  // Search by product name
  searchByProductName(productName: string): Observable<Page<ShoppingPlan>> {
    return this.http.get<Page<ShoppingPlan>>(
      this.baseURL + '/search-by-product-name?productName=' + productName,
      {
        headers: this.headers,
      }
    );
  }

  advancedSearch(
    planListID: number,
    nameOfPlanList: string,
    createdDateStart: LocalDate,
    createdDateEnd: LocalDate,
    approvedDateStart: LocalDate,
    approvedDateEnd: LocalDate,
    planListDetailStatus1: boolean,
    planListDetailStatus2: boolean,
    planListDetailStatus3: boolean,
    planListDetailStatus4: boolean
  ): Observable<Page<PlanListDetail>> {
    const urlParts: string[] = [
      `http://localhost:8080/api/v1/plan-list-detail/search?planListID=${planListID}&nameOfPlanList=${nameOfPlanList}&createdDateStart=${createdDateStart}&createdDateEnd=${createdDateEnd}&approvedDateStart=${approvedDateStart}&approvedDateEnd=${approvedDateEnd}`,
    ];
    if (planListDetailStatus1) {
      urlParts.push(`planListDetailStatus1=DRAFT`);
    }
    if (planListDetailStatus2) {
      urlParts.push(`planListDetailStatus2=PENDING`);
    }
    if (planListDetailStatus3) {
      urlParts.push(`planListDetailStatus3=APPROVED`);
    }
    if (planListDetailStatus4) {
      urlParts.push(`planListDetailStatus4=CANCELLED`);
    }
    // tslint:disable-next-line:max-line-length
    if (
      planListDetailStatus1 === false &&
      planListDetailStatus2 === false &&
      planListDetailStatus3 === false &&
      planListDetailStatus4 === false
    ) {
      urlParts.push(`planListDetailStatus1=DRAFT`);
      urlParts.push(`planListDetailStatus2=PENDING`);
      urlParts.push(`planListDetailStatus3=APPROVED`);
      urlParts.push(`planListDetailStatus4=CANCELLED`);
    }
    const fullURL = urlParts.join('&');
    console.log(fullURL);
    return this.http.get<Page<PlanListDetail>>(fullURL);
  }

  advancedSearchPageable(
    year: string,
    planListID: number,
    nameOfPlanList: string,
    createdDateStart: LocalDate,
    createdDateEnd: LocalDate,
    approvedDateStart: LocalDate,
    approvedDateEnd: LocalDate,
    planListDetailStatus1: boolean,
    planListDetailStatus2: boolean,
    planListDetailStatus3: boolean,
    planListDetailStatus4: boolean,
    page: number,
    size: number
  ): Observable<Page<PlanListDetail>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };
    const urlParts: string[] = [
      `http://localhost:8080/api/v1/plan-list-detail/search?year=${year}&planListID=${planListID}&nameOfPlanList=${nameOfPlanList}&createdDateStart=${createdDateStart}&createdDateEnd=${createdDateEnd}&approvedDateStart=${approvedDateStart}&approvedDateEnd=${approvedDateEnd}`,
    ];
    if (planListDetailStatus1) {
      urlParts.push(`planListDetailStatus1=DRAFT`);
    }
    if (planListDetailStatus2) {
      urlParts.push(`planListDetailStatus2=PENDING`);
    }
    if (planListDetailStatus3) {
      urlParts.push(`planListDetailStatus3=APPROVED`);
    }
    if (planListDetailStatus4) {
      urlParts.push(`planListDetailStatus4=CANCELLED`);
    }
    // tslint:disable-next-line:max-line-length
    if (
      planListDetailStatus1 === false &&
      planListDetailStatus2 === false &&
      planListDetailStatus3 === false &&
      planListDetailStatus4 === false
    ) {
      urlParts.push(`planListDetailStatus1=DRAFT`);
      urlParts.push(`planListDetailStatus2=PENDING`);
      urlParts.push(`planListDetailStatus3=APPROVED`);
      urlParts.push(`planListDetailStatus4=CANCELLED`);
    }
    const fullURL = urlParts.join('&');
    console.log(fullURL);
    return this.http.get<Page<PlanListDetail>>(fullURL, options);
  }

  advancedSearchPageable1(
    year: string,
    planListID: number,
    nameOfPlanList: string,
    createdDateStart: LocalDate,
    createdDateEnd: LocalDate,
    approvedDateStart: LocalDate,
    approvedDateEnd: LocalDate,
    planListDetailStatus2: boolean,
    planListDetailStatus3: boolean,
    planListDetailStatus4: boolean,
    page: number,
    size: number
  ): Observable<Page<PlanListDetail>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };
    const urlParts: string[] = [
      `http://localhost:8080/api/v1/plan-list-detail/search?year=${year}&planListID=${planListID}&nameOfPlanList=${nameOfPlanList}&createdDateStart=${createdDateStart}&createdDateEnd=${createdDateEnd}&approvedDateStart=${approvedDateStart}&approvedDateEnd=${approvedDateEnd}`,
    ];
    if (planListDetailStatus2) {
      urlParts.push(`planListDetailStatus2=PENDING`);
    }
    if (planListDetailStatus3) {
      urlParts.push(`planListDetailStatus3=APPROVED`);
    }
    if (planListDetailStatus4) {
      urlParts.push(`planListDetailStatus4=CANCELLED`);
    }
    // tslint:disable-next-line:max-line-length
    if (
      planListDetailStatus2 === false &&
      planListDetailStatus3 === false &&
      planListDetailStatus4 === false
    ) {
      urlParts.push(`planListDetailStatus2=PENDING`);
      urlParts.push(`planListDetailStatus3=APPROVED`);
      urlParts.push(`planListDetailStatus4=CANCELLED`);
    }
    const fullURL = urlParts.join('&');
    console.log(fullURL);
    return this.http.get<Page<PlanListDetail>>(fullURL, options);
  }

  createShoppingPlan(data: any): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-shopping-plan`, data, {
      headers: this.headers,
    });
  }

  updateShoppingPlan(id: number, shoppingPlan: any): Observable<Object> {
    return this.http.put(
      `${this.baseURL}/update-shopping-plan/${id}`,
      shoppingPlan,
      { headers: this.headers }
    );
  }

  getShoppingPlan(id: number): Observable<ShoppingPlan> {
    return this.http.get<ShoppingPlan>(
      `${this.baseURL}/get-shopping-plan/${id}`,
      {
        headers: this.headers,
      }
    );
  }

  getShoppingPlanByPlanListDetail(
    page: number,
    size: number,
    id: number
  ): Observable<Page<ShoppingPlan>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<ShoppingPlan>>(
      `${this.baseURL}/get-shopping-plan-by-plan-list-detail?idPlanListDetail=${id}`,
      options
    );
  }

  getShoppingPlanByPlanListDetailNotPagination(
    id: number
  ): Observable<ShoppingPlan[]> {
    return this.http.get<ShoppingPlan[]>(
      `${this.baseURL}/get-shopping-plan-by-plan-list-detail-not-pagination?idPlanListDetail=${id}`,
      { headers: this.headers }
    );
  }
  getDefaultTemplate(id: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseURL}/get-shopping-plan-by-plan-list-detail-not-pagination?idPlanListDetail=${id}`
      )
      .pipe(
        catchError((httpError: any) => {
          return throwError(httpError);
        })
      );
  }
  getAllVersionByShoppingPlan(id: number) {
    return this.http.get(
      `${this.baseURL}/get-versions-by-shopping-plan-id/${id}`,
      { headers: this.headers }
    );
  }

  getShoppingPlanUpdatedHistoryByVersion(id: number, version: string) {
    return this.http.get(
      `${this.baseURL}/get-shopping-plan-updated-history/id/${id}/version/${version}`,
      {
        headers: this.headers,
      }
    );
  }
}
