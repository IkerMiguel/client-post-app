import { Component, inject, signal } from '@angular/core';
import { UserTableComponent } from "../../../users/components/user-table/user-table.component";
import { UserService } from '../../../users/services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-user-page',
  imports: [UserTableComponent, RouterLink, PaginationComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {
  userService = inject(UserService);
  paginationService = inject(PaginationService);
  limit =signal(4);

  setLimit = (limit: string) => {
    this.limit.set(Number(limit));
  };

  userResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage(),
      limit: this.limit(),
    }),
    loader: ({ request }) => {
      return this.userService.getUsers({
        limit: request.limit,
        page: request.page,
      });
    },
  });
}
