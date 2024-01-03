import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { ShareService } from 'src/app/service/share.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private formBuild: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private shareService: ShareService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  email: string;
  password: string;
  formGroup: FormGroup;
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: string;
  isLoggingIn = false;
  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams.returnUrl ||
      '/admin/danh-muc-mua-sam';

    this.formGroup = this.formBuild.group({
      email: [''],
      password: [''],
      remember_me: [''],
    });

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles[0];
      this.email = this.tokenStorageService.getUser().email;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      (data) => {
        if (this.formGroup.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.authService.isLoggedIn = true;
        this.email = this.tokenStorageService.getUser().email;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();
      },
      (err) => {
        console.log('loi k dang nhap dc');
      }
    );
  }

  login(email: string, password: string) {
    const apiUrl =
      'http://localhost:8080/api/v1/authentication/login';
    const requestData = { email, password };

    if (this.isLoggingIn) {
      return;
    }

    this.isLoggingIn = true;

    this.http
      .post(apiUrl, requestData)
      .subscribe(
        (response: any) => {
          console.log(response);
          localStorage.clear();
          localStorage.setItem('jwtToken', response.jwt);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('name', response.name);
          localStorage.setItem('role', response.roles);
          this.openSnackBar('Đăng nhập thành công');

          setTimeout(() => {
            const newWindow = window.open(this.returnUrl, '_blank');
            if (newWindow) {
              newWindow.focus();
            }
            this.router.navigateByUrl(this.returnUrl);
          }, 1000);
        },
        (error) => {
          this.openSnackBar(
            'Thông tin tài khoản không chính xác hoặc chưa được kích hoạt'
          );
        }
      )
      .add(() => {
        this.isLoggingIn = false;
      });
  }

  openSnackBar(message: string, action: string = 'Đóng') {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  openForgotPasswordModal(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
