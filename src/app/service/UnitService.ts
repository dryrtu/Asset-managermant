import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../domain/Unit';
import { Page } from '../domain/pageable';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/unit';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Lấy danh sách unit
  getUnitList(page: number, size: number): Observable<Page<Unit>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<Unit>>(
      'http://localhost:8080/api/v1/unit/get-all-unit-pageable',
      options
    );
  }

  createUnit(newUnitData: Unit): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-unit`, newUnitData, {
      headers: this.headers,
    });
  }

  getUnitById(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.baseURL}/get-unit/${id}`, {
      headers: this.headers,
    });
  }

  getAllUnit(): Observable<Unit> {
    return this.http.get<Unit>(`${this.baseURL}/get-all-unit`, {
      headers: this.headers,
    });
  }

  deleteUnit(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-unit/${id}`, {
      headers: this.headers,
    });
  }

  updateUnit(id: number, unit: Unit): Observable<Object> {
    return this.http.put(`${this.baseURL}/update-unit/${id}`, unit, {
      headers: this.headers,
    });
  }
}
