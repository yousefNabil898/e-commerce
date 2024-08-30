import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  step: number = 1

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });

  submitEmailVerification(): void {
    this._AuthService.setEmailVerfiy(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg == "success") {
          this.step = 2
        }

      },
      error: (err) => {
        console.log(err);

      }
    });

  }
  submitCodeVerification(): void {
    this._AuthService.setECodeVerfiy(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "Success") {
          this.step = 3
        }

      },
      error: (err) => {
        console.log(err);

      }
    });

  }
  submitRestVerification(): void {
    this._AuthService.restVerfiy(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem("userToken", res.token)
        this._Router.navigate(["/home"])

      },
      error: (err) => {
        console.log(err);

      }
    });

  }
}
