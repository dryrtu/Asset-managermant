import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/pageable';
import { PlanList } from '../domain/PlanList';
import { PlanListDetail } from '../domain/PlanListDetail';

@Injectable({
  providedIn: 'root',
})
export class PlanListDetailService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/plan-list-detail';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Gọi tới api lấy danh sách planlistdetail
  getAllPlanListDetailPageable(
    page: number,
    size: number
  ): Observable<Page<PlanListDetail>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<PlanListDetail>>(
      'http://localhost:8080/api/v1/plan-list-detail/get-all-plan-list-detail-pageable',
      options
    );
  }

  getAllPlanListDetail(): Observable<PlanListDetail> {
    return this.http.get<PlanListDetail>(
      `${this.baseURL}/get-all-plan-list-detail`,
      { headers: this.headers }
    );
  }

  createPlanListDetail(newPlanListData: any): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/create-plan-list-detail`,
      newPlanListData,
      { headers: this.headers }
    );
  }

  // Xóa sp
  deletePlanListDetail(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-plan-list-detail/${id}`, {
      headers: this.headers,
    });
  }

  getPlansListDetailByYear(selectedYear: string): Observable<any[]> {
    const apiUrl = `${this.baseURL}/get-plan-list-detail-by-plan-list?idPlanList=${selectedYear}`;
    return this.http.get<any[]>(apiUrl, { headers: this.headers });
  }

  getPlanListDetailByIdd(id: number): Observable<PlanListDetail> {
    return this.http.get<PlanListDetail>(
      `${this.baseURL}/get-plan-list-detail/${id}`,
      { headers: this.headers }
    );
  }

  updatePlanListDetail(
    id: number,
    planListDetail: PlanListDetail
  ): Observable<Object> {
    return this.http.put(
      `${this.baseURL}/update-plan-list-detail/${id}`,
      planListDetail,
      { headers: this.headers }
    );
  }

  // Chuyển status sang pending
  changePlanListStatusToPending(id: number): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-status?id=${id}&status=Chờ phê duyệt`,
      { headers: this.headers }
    );
  }

  // ADMIN phê duyệt
  changePlanListStatusToApproved(id: number): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-status?id=${id}&status=Đã phê duyệt`,
      { headers: this.headers }
    );
  }
  changeProductStatusToCancelled(id: number): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/change-status?id=${id}&status=Từ chối phê duyệt`,
      { headers: this.headers }
    );
  }
}
