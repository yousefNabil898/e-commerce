import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient)


  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/products`)
  }
  
  getSpacifProduct(id: string | null): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/products/${id}`)
  }

}
