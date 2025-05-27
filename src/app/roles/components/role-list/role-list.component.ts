import { Component, input, output, signal } from '@angular/core';
import { Role } from '@roles/interfaces/roles.interface';
import { RoleModalComponent } from "../role-modal/role-modal.component";
import { signalUpdateFn } from 'node_modules/@angular/core/weak_ref.d-DWHPG08n';

@Component({
  selector: 'role-list',
  imports: [RoleModalComponent],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {

  roles = input.required<Role[]>();
  openModal = signal(false);
  currentRole = signal({}as Role);
deleted = output<string>();

  emitDelete(id: string) {
    this.deleted.emit(id);
  }
  editRole(role: Role) {
    this.openModal.set(true);
    this.currentRole.set(role);
  }

}
