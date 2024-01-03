import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/pageable';
import { PlanList } from '../domain/PlanList';

@Injectable({
  providedIn: 'root',
})
export class PlanListService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/plan-list';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Gọi tới api lấy danh sách planlist
  getAllPlanListPageable(
    page: number,
    size: number
  ): Observable<Page<PlanList>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<PlanList>>(
      'http://localhost:8080/api/v1/plan-list/get-all-plan-list-pageable',
      options
    );
  }

  getAllPlanList(): Observable<PlanList> {
    return this.http.get<PlanList>(`${this.baseURL}/get-all-plan-list`, {
      headers: this.headers,
    });
  }

  createPlanList(newPlanListData: PlanList): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-plan-list`, newPlanListData, {
      headers: this.headers,
    });
  }

  // Xóa sp
  deletePlanList(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-plan-list/${id}`, {
      headers: this.headers,
    });
  }

  getPlanListById(id: number) {
    return this.http.get(`${this.baseURL}/get-plan-list/${id}`, {
      headers: this.headers,
    });
  }

  updatePlanList(id: number, planList: PlanList): Observable<Object> {
    return this.http.put(`${this.baseURL}/update-plan-list/${id}`, planList, {
      headers: this.headers,
    });
  }
}
