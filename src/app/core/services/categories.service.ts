import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient)




  getAllcategories(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/categories`)
  }
  getSpacifccategories(data: string): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/categories${data}`)
  }
}