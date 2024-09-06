import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  userData: any = {}
  private readonly _OrdersService = inject(OrdersService)
  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem("userToken")!)
    this._OrdersService.getUserOrders(this.userData.id).subscribe({
      next: (res) => {
        console.log(res);

      }
    })
  }

}
