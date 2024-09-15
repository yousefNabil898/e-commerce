import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient)


  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/brands`)
  }
  getSpacificBrands(id: string): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/brands/${id}`)
  }


}
