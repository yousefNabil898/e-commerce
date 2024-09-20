import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { jwtDecode } from 'jwt-decode';
import { IAllorders } from '../../core/interfaces/IallOrders';
import { NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { WhishlistService } from '../../core/services/whishlist.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  userData: any = {}
  allOrder: IAllorders[] = []
  private readonly _OrdersService = inject(OrdersService)
  private readonly _CartService= inject(CartService)
  private readonly _WhishlistService= inject(WhishlistService)
  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem("userToken")!)
    this._OrdersService.getUserOrders(this.userData.id).subscribe({
      next: (res) => {
        this.allOrder = res
      }
    })
    this._CartService.getUserCart().subscribe({
      next: (res) => {
          this._CartService.numCartItems.set(res.numOfCartItems)
          console.log(res);

      }
  })
this._WhishlistService.getUserWishlist().subscribe({
      next: (res) => {
          console.log(res);
          this._WhishlistService.numWishIems.set(res.data.length)


      }
  })

  }

}
