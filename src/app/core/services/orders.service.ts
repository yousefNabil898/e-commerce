import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _HttpClient = inject(HttpClient)

  myheaders: any = { token: localStorage.getItem("userToken") }

  creatCashOrder(cardId: string | null, shippingDetailes: object): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cardId}?url=${enviroment.urlServer}`, {
      "shippingAddress": shippingDetailes
    },)
  }
  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/orders/user/${userId}`)
  }

}
