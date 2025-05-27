import { Component, inject, signal } from '@angular/core';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { RolesService } from '@roles/services/roles.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { RoleListComponent } from "@roles/components/role-list/role-list.component";
import { RoleModalComponent } from "../../../roles/components/role-modal/role-modal.component";
import { Role } from '@roles/interfaces/roles.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-page',
  imports: [PaginationComponent, RoleListComponent, RoleModalComponent],
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.css'
})
export class RolesPageComponent {
  roleService = inject(RolesService);
  paginationService = inject(PaginationService);
  openModal = signal(false);
  limit =signal(5);

  emptyRole: Role = {
    id: 'new',
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  setLimit = (limit: string) => {
    this.limit.set(Number(limit));
  };

  roleResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage(),
      limit: this.limit(),
    }),
    loader: ({ request }) => {
      return this.roleService.getRoles({
        limit: request.limit,
        page: request.page,
      });
    },
  });

  deletedRole(id: string) {
            Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.roleService.deletedRole(id).subscribe(()=> {});
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your role has been deleted.",
                        icon: "success",
                          showCancelButton: false,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Ok"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            location.reload();
                          }
                        });
        }
     });
    }

}
