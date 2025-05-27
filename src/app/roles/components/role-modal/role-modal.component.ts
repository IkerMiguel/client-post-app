import { Component, effect, inject, input, linkedSignal, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '@roles/interfaces/roles.interface';
import { RolesService } from '@roles/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'role-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.css'
})
export class RoleModalComponent {

  roleService = inject(RolesService);
  router = inject(Router);
  role =input.required<Role>();
  isOpen = input.required();
  fb = inject(FormBuilder);
  isClose = output();

  closeModal(){
    this.isClose.emit();
  }

    roleForm = this.fb.group({
    name: ['', Validators.required]
  });

  ngOnInit() {
    console.log(this.role());
    this.roleForm.patchValue({
      name: this.role().name
    });
    console.log(this.roleForm.value)
  }

  roleEffect = effect(() =>{
    if(this.isOpen()){
      this.roleForm.patchValue({
      name: this.role().name
    });
    }
  });

  onSubmit() {
    const isValid = this.roleForm.valid;
    this.roleForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.roleForm.value;

    if (this.role().id === 'new') {
      this.roleService.created(formValue).subscribe((resp) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Role created',
          showConfirmButton: false,
          timer: 1500, 
        });
        this.isClose.emit();
      });
    } else {
      this.roleService.updated(this.role().id, formValue).subscribe((resp) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Role Updated',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isClose.emit();
      });
    }
  }

}
