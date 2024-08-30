import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)





  errMes: string = ""
  succMes: boolean = false



  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })


  loginFormSubmite(): void {
    if (this.loginForm.valid) {
      this._AuthService.setloginForm(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem("userToken", res.token)
          this.succMes = true
          this.errMes = ""
          this._AuthService.saveUserData()
          setTimeout(() => {
            this._Router.navigate(['/home'])
          }, 3000)


        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errMes = err.error.message
          this.succMes = false



        }
      })

    }
    else {
      this.loginForm.markAllAsTouched()
    }

  }

}
