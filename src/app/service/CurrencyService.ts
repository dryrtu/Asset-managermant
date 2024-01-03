import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../domain/Unit';
import { Page } from '../domain/pageable';
import { Currency } from '../domain/Currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  private baseURL =
    'http://localhost:8080/api/v1/currency';

  authToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  // Lấy danh sách unit
  getCurrencyList(page: number, size: number): Observable<Page<Currency>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };

    return this.http.get<Page<Currency>>(
      'http://localhost:8080/api/v1/currency/get-all-currency-pageable',
      options
    );
  }

  createCurrency(newCurrencyData: Currency): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-currency`, newCurrencyData, {
      headers: this.headers,
    });
  }

  getCurrencyById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.baseURL}/get-currency/${id}`, {
      headers: this.headers,
    });
  }

  deleteCurrency(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/delete-currency/${id}`, {
      headers: this.headers,
    });
  }

  getAllCurrency(): Observable<Currency> {
    return this.http.get<Currency>(`${this.baseURL}/get-all-currency`, {
      headers: this.headers,
    });
  }

  updateCurrency(id: number, currency: Currency): Observable<Object> {
    return this.http.put(`${this.baseURL}/update-currency/${id}`, currency, {
      headers: this.headers,
    });
  }
}
