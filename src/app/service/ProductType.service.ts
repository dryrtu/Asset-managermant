import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/pageable';
import { ProductType } from '../domain/ProductType';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/product-type';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Gọi tới api lấy danh sách productType
  getAllProductTypePageable(
    page: number,
    size: number
  ): Observable<Page<ProductType>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<ProductType>>(
      'http://localhost:8080/api/v1/product-type/get-all-product-type-pageable',
      options
    );
  }

  getAllProductType(): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.baseURL}/get-all-product-type`, {
      headers: this.headers,
    });
  }

  createProductType(newProductTypeData: ProductType): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/create-product-type`,
      newProductTypeData,
      { headers: this.headers }
    );
  }

  // Xóa sp
  deleteProductType(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-product-type/${id}`, {
      headers: this.headers,
    });
  }

  getProductTypeByIdd(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(
      `${this.baseURL}/get-product-type/${id}`,
      { headers: this.headers }
    );
  }

  updateProductType(
    id: any,
    newProductTypeData: ProductType
  ): Observable<Object> {
    return this.http.put(
      `${this.baseURL}/update-product-type/${id}`,
      newProductTypeData,
      { headers: this.headers }
    );
  }
}
