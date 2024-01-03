import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string;
  idPatient: number;
  currentUser: string;
  role: string;
  isLoggedIn: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  loadHeader(): void {
    // if (this.tokenStorageService.getToken()) {
    //   this.currentUser = this.tokenStorageService.getUser().username;
    //   this.role = this.tokenStorageService.getUser().roles[0];
    //   this.username = this.tokenStorageService.getUser().username;
    // }
    // this.isLoggedIn = this.username != null;
    // this.getUsernameAccount();
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  authToken = localStorage.getItem('jwtToken');

  user = localStorage.getItem('name');

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });

  logout() {
    window.localStorage.clear();
    window.location.reload();
    // this.http.post('http://localhost:8080/api/v1/authentication/logout', {headers: this.headers}).subscribe(
    //   (response) => {
    //     console.log('Đăng xuất thành công');
    //     // this.router.navigate(['/login']);
    //   },
    //   (error) => {
    //     console.error('Đăng xuất thất bại', error);
    //   }
    // );
  }
}
