import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/user';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TableOptions } from '../domain/table-option.model';
import { Page } from '../domain/pageable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    if (window && window.localStorage) {
      this.authToken = window.localStorage.getItem('jwtToken');
    }
  }

  private baseURL =
    'http://localhost:8080/api/v1/users';

  authenToken = localStorage.getItem('jwtToken');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authenToken}`,
  });

  authToken = '';
  redirectUrl: string = '/admin/dashboard';

  getUserList(page: number, size: number): Observable<Page<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const options = { params, headers: this.headers };
    return this.http.get<Page<User>>(
      `${this.baseURL}/get-all-user-pageable`,
      options
    );
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`, { headers: this.headers });
  }

  createUser(user: User): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-user`, user, {
      headers: this.headers,
    });
  }

  createAdmin(user: User): Observable<Object> {
    return this.http.post(`${this.baseURL}/create-admin`, user, {
      headers: this.headers,
    });
  }
}
