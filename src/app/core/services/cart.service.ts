import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myHeaders: any = { Token: localStorage.getItem('userToken') }
  private readonly _HttpClient = inject(HttpClient)


  addProductCart(id: string): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      },
  
    )
  }
  getProductCart(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/cart`,
  
    )
  }
  deleteProductCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/cart/${id}`,

    )
  }
  updateProductCart(quantity: number, id: string): Observable<any> {
    return this._HttpClient.put(`${enviroment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": quantity
      },
  
    )
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/cart`,

    )
  }

}
