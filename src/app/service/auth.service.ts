import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API =
  'http://localhost:8080/api/v1/authentication/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'Access-Control-Allow-Origin': 'localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
  }

  login(obj): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email: obj.email,
        password: obj.password,
      },
      this.httpOptions
    );
  }

  verify(code: string): Observable<any> {
    console.log(code);
    return this.http.post(
      AUTH_API + 'verify',
      {
        code: code,
      },
      this.httpOptions
    );
  }

  verifyPassword(code: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'verify-password',
      {
        code: code,
      },
      this.httpOptions
    );
  }

  resetPassword(username: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'reset-password',
      {
        username: username,
      },
      this.httpOptions
    );
  }

  doResetPassword(password: string, code: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'do-reset-password',
      {
        password: password,
        code: code,
      },
      this.httpOptions
    );
  }
}
