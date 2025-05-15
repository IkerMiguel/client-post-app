import { Component, inject, signal, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  fh = inject(FormBuilder);
  hasError = signal(false);
  type = 'password';
  icon = 'bi bi-eye';

  showPassword(type: string) {
    if(type === 'password') {
      this.type = 'text';
      this.icon = 'bi bi-eye-slash';
    } else {
      this.type = 'password';
      this.icon = 'bi bi-eye';
    }
  }

  loginForm = this.fh.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onsubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const {email = '', password = ''} = this.loginForm.value;
    console.log({email, password});
  }
}
