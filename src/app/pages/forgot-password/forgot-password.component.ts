import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: any;
  newPassword: any;
  rePassword: any;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private http: HttpClient
  ) {}
  apiUrl = 'http://localhost:8080/api/v1/users';

  sendOtp(): void {
    const apiUrl =
      'http://localhost:8080/api/v1/users/otp-sending';

    const payload = {
      email: this.email,
    };

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        Swal.fire(
          'Thành công',
          'Mã xác nhận đã được gửi, vui lòng kiểm tra email của bạn!',
          'success'
        );
      },
      (error) => {
        Swal.fire('Lỗi', 'Đã có lỗi xảy ra', 'error');
      }
    );
  }

  passwordsMatch(): boolean {
    return this.newPassword === this.rePassword;
  }

  close(): void {
    this.dialogRef.close();
  }

  isSubmit: boolean = false;

  isValidEmail(): boolean {
    return this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  isValidOtp(): boolean {
    return this.otp && this.otp.trim().length > 0;
  }

  isValidPassword(): boolean {
    return this.newPassword && this.newPassword.trim().length > 0;
  }

  isValidForm(): boolean {
    return (
      this.isValidEmail() &&
      this.isValidOtp() &&
      this.isValidPassword() &&
      this.passwordsMatch()
    );
  }

  confirmChange(otp: any, newPassword: any, rePassword: any) {
    const requestBody = {
      newPassword: newPassword,
      rePassword: rePassword,
    };

    const params = new HttpParams().set('otpCode', otp);

    this.http
      .put(`${this.apiUrl}/forgot-password`, requestBody, { params: params })
      .subscribe(
        (response: any) => {
          Swal.fire('Thành công', 'Thay đổi mật khẩu thành công.', 'success');
        },
        (error) => {
          Swal.fire('Lỗi', 'Mã OTP không chính xác hoặc đã hết hạn.', 'error');
        }
      );
  }
}
