import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@users/interfaces/user.interface';

@Component({
  selector: 'user-table',
  imports: [RouterLink],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  users = input.required<User[]>();
  deleted = output<string>();

  emitDelete(id: string) {
    this.deleted.emit(id);
  }
}
