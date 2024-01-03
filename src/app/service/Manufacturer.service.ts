import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../domain/pageable';
import { Manufacturer } from '../domain/Manufacturer';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/manufacturer';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Lấy danh sách manufacturer
  getManufacturerList(
    page: number,
    size: number
  ): Observable<Page<Manufacturer>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<Manufacturer>>(
      'http://localhost:8080/api/v1/manufacturer/get-all-manufacturer-pageable',
      options
    );
  }

  // tslint:disable-next-line:ban-types
  createManufacturer(newManufacturerData: Manufacturer): Observable<Object> {
    return this.http.post(
      `${this.baseURL}/create-manufacturer`,
      newManufacturerData,
      {
        headers: this.headers,
      }
    );
  }

  getManufacturerById(id: number): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(
      `${this.baseURL}/get-manufacturer/${id}`,
      {
        headers: this.headers,
      }
    );
  }

  // tslint:disable-next-line:ban-types
  deleteManufacturer(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-manufacturer/${id}`, {
      headers: this.headers,
    });
  }

  getAllManufacturerNotPageable(): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(`${this.baseURL}/get-all-manufacturer`, {
      headers: this.headers,
    });
  }

  // tslint:disable-next-line:no-shadowed-variable ban-types
  updateManufacturer(
    id: number,
    Manufacturer: Manufacturer
  ): Observable<Object> {
    return this.http.put(
      `${this.baseURL}/update-Manufacturer/${id}`,
      Manufacturer,
      {
        headers: this.headers,
      }
    );
  }
}
