import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: User = new User();

  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private userService: UserService,
    protected router: Router
  ) {}

  // Modal
  close(): void {
    this.dialogRef.close();
  }

  loading: boolean = false;

onSubmit() {
  this.loading = true;

  if (this.user.role === 'ADMIN') {
    this.userService.createAdmin(this.user).subscribe(
      (data) => {
        Swal.fire({
          title: 'Tạo người dùng thành công!',
          text: 'Người dùng đã được tạo.',
          icon: 'success',
        }).then(() => {
          setTimeout(() => {
            this.goToUserList();
            this.loading = false;
          }, 2000);
        });
      },
      (error) => {
        Swal.fire('Lỗi!', 'Không thể tạo người dùng.', 'error');
        console.log(error);
        this.loading = false;
      }
    );
  } else if (this.user.role === 'USER') {
    this.userService.createUser(this.user).subscribe(
      (data) => {
        Swal.fire({
          title: 'Tạo người dùng thành công!',
          text: 'Người dùng đã được tạo.',
          icon: 'success',
        }).then(() => {
          setTimeout(() => {
            this.goToUserList();
            this.loading = false;
          }, 2000);
        });
      },
      (error) => {
        Swal.fire('Lỗi!', 'Không thể tạo người dùng.', 'error');
        console.log(error);
        this.loading = false;
      }
    );
  }
}


  goToUserList() {
    this.router.navigate(['/admin/users']);
    window.location.reload();
  }
}
