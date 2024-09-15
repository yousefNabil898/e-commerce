import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  private readonly _HttpClient = inject(HttpClient)
  numWishIems: WritableSignal<Number> = signal(0)




  addProdcutWishlist(id: string): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/wishlist`,
      {
        "productId": `${id}`
      }
    )
  }
  deletePrdcutWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseUrl}/api/v1/wishlist/${id}`
    )
  }
  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/wishlist`)
  }
}