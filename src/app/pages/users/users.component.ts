import { Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] | any = [];
  pageIndex: number;
  pageSize: number;
  totalItems: any;


  constructor(
    private userService: UserService, 
    private dialog: MatDialog, 
    private http: HttpClient,
    private location: Location,
    private router: Router  ) {}


    
  ngOnInit(): void {
    const initialPageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
    this.onPageChange(initialPageEvent);
  }

   onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.userService.getUserList(this.pageIndex, this.pageSize).subscribe(data => {
      this.users = data.content;
      this.totalItems = data.totalElements;

      console.log(this.users)
    });
  }


  // Open modal create user
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Delete User
  deleteUser(id: number) {
    Swal.fire({
      title: 'Xác nhận xóa người dùng',
      text: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (data: any) => {
            Swal.fire('Xóa thành công!', 'Người dùng đã được xóa.', 'success').then(() => {
              setTimeout(() => {
                this.goToUserList();
              }, 2000);
            });
          },
          (error) => {
            Swal.fire('Lỗi!', 'Không thể xóa người dùng.', 'error');
            console.log(error);
          }
        );
      }
    });
  }
  

  goToUserList() {
    this.router.navigate(['/admin/users']);
    window.location.reload();
  }

}
