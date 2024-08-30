import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null
  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router = inject(Router)

  constructor() {

  }
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup`, data)
  }
  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin`, data)
  }
  saveUserData(): void {
    if (localStorage.getItem("userToken") !== null) {
      this.userData = jwtDecode(localStorage.getItem("userToken")!)

    }
  }
  logOut() {
    localStorage.removeItem("userToken")
    this.userData = null
    this._Router.navigate(["/login"])
  }






  setEmailVerfiy(data: object): Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`, data)

  }
  setECodeVerfiy(data: object): Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`, data)

  }
restVerfiy(data: object): Observable<any>{
    return this._HttpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`, data)

  }
}
