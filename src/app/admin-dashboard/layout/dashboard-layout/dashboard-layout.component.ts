import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  authService = inject(AuthService);

  router = inject(Router);


  logout() {
    Swal.fire({
  title: "Are you sure?",
  text: "Close the session?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes please!",
}).then((result) => {
  if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl('/');
    Swal.fire({
      title: "Bye Bye!",
      text: "Nos vemos pronto!",
      icon: "info"
    });
  }
});

  }
}
