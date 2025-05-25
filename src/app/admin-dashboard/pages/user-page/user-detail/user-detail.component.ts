import { Component, inject, input } from '@angular/core';
import { User } from '../../../../users/interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../users/services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserImagePipe } from '../../../../users/pipes/user-image.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-detail',
  imports: [ReactiveFormsModule, UserImagePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  user = input.required<User>();
  router = inject(Router);
  fb = inject(FormBuilder);

  UserService = inject(UserService);

  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    role_id: ['', Validators.required],
    password: [''],
    avatar: [''],
  });

  ngOnInit() {
    this.userForm.patchValue({
      first_name: this.user().first_name,
      last_name: this.user().last_name,
      email: this.user().email,
      telephone: this.user().telephone,
      role_id: this.user().Role?.id ?? this.user().role_id ?? '',
      avatar: this.user().avatar,
      password: '',
    });

    console.log(this.userForm.value);
  }

  rolerResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.UserService.getRoles();
    },
  });

  onSubmit() {
    const isValid = this.userForm.valid;
    this.userForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.userForm.value;

    if (this.user().id === 'new') {
      this.UserService.created(formValue).subscribe((resp) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User created',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/dashboard/users', resp.data.id]);
      });
    } else {
      this.UserService.updated(this.user().id, formValue).subscribe((resp) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Updated',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  }
}
