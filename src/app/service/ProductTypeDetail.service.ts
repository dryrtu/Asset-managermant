import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/pageable';
import { PlanList } from '../domain/PlanList';
import { PlanListDetail } from '../domain/PlanListDetail';
import { ProductTypeDetail } from '../domain/ProductTypeDetail';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeDetailService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/product-type-detail';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Gọi tới api lấy danh sách planlistdetail
  getAllProductTypeDetailPageable(
    page: number,
    size: number
  ): Observable<Page<ProductTypeDetail>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<ProductTypeDetail>>(
      'http://localhost:8080/api/v1/product-type-detail/get-all-product-type-detail-pageable',
      options
    );
  }

  getAllProductTypeDetail(): Observable<ProductTypeDetail> {
    return this.http.get<ProductTypeDetail>(
      `${this.baseURL}/get-all-plan-list-detail`,
      { headers: this.headers }
    );
  }

  createProductTypeDetail(data: any): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-product-type-detail`, data, {
      headers: this.headers,
    });
  }

  // Xóa sp
  deleteProductTypeDetail(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-product-type-detail${id}`, {
      headers: this.headers,
    });
  }

  getProductTypeDetailByType(idProductType: string): Observable<any[]> {
    const apiUrl = `${this.baseURL}/get-product-type-detail-by-type?idProductType=${idProductType}`;
    return this.http.get<any[]>(apiUrl, { headers: this.headers });
  }

  getProductTypeDetailById(id: number): Observable<ProductTypeDetail> {
    return this.http.get<ProductTypeDetail>(
      `${this.baseURL}/get-product-type-detail/${id}`,
      { headers: this.headers }
    );
  }

  updateProductType(
    id: any,
    newProductTypeDetailData: any
  ): Observable<Object> {
    return this.http.put(
      `${this.baseURL}/update-product-type-detail/${id}`,
      newProductTypeDetailData,
      { headers: this.headers }
    );
  }
}
