import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)





  errMes: string = ""
  succMes: boolean = false



  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmPassword)


  registerSubmite(): void {
    if (this.registerForm.valid) {
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.succMes = true
          this.errMes = ""
          setTimeout(() => {
            this._Router.navigate(['/login'])
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
      this.registerForm.markAllAsTouched()
    }

  }
  confirmPassword(g: AbstractControl) {
    if (g.get("password")?.value === g.get("rePassword")?.value) {
      return null
    } else {
      return { mismatch: true }
    }


  }



}
