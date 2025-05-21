import { Component, input } from '@angular/core';

@Component({
  selector: 'user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  users = input.required<any>();
}
