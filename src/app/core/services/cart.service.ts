import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myHeaders: any = { Token: localStorage.getItem('userToken') }
  private readonly _HttpClient = inject(HttpClient)
  numCartItems: WritableSignal<Number> = signal(0)


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
  getUserCart(): Observable<any> {
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
