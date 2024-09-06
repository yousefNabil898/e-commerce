import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService);
  cartId: null | string = ""
  order: FormGroup = new FormGroup({
    detailes: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })
  orderSubmite(): void {
    this._OrdersService.creatCashOrder(this.cartId, this.order.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          window.open(res.session.url,)

        }

      },
      error: (err) => {
        console.log(err);

      }
    })

  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get("id")
        console.log(this.cartId);

      }
    })
  }
}
