import { Component, inject } from '@angular/core';
import { UserTableComponent } from "../../../users/components/user-table/user-table.component";
import { UserService } from '../../../users/services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-page',
  imports: [UserTableComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  userService = inject(UserService);

  userResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.userService.getUsers();
    },
  });
}
