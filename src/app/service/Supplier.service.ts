import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../domain/Supplier';
import { Page } from '../domain/pageable';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/supplier';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Lấy danh sách supplier
  getSupplierList(page: number, size: number): Observable<Page<Supplier>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<Supplier>>(
      'http://localhost:8080/api/v1/supplier/get-all-supplier-pageable',
      options
    );
  }

  createSupplier(newSupplierData: Supplier): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-supplier`, newSupplierData, {
      headers: this.headers,
    });
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseURL}/get-supplier/${id}`, {
      headers: this.headers,
    });
  }

  deleteSupplier(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-supplier/${id}`, {
      headers: this.headers,
    });
  }

  getAllSupplierNotPageable(): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseURL}/get-all-supplier`, {
      headers: this.headers,
    });
  }

  updateSupplier(id: number, supplier: Supplier): Observable<Object> {
    return this.http.put(`${this.baseURL}/update-supplier/${id}`, supplier, {
      headers: this.headers,
    });
  }
}
