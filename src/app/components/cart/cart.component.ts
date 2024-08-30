import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CommonModule, CurrencyPipe } from '@angular/common';


@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    private readonly _CartService = inject(CartService)

    cartItems: Icart = {} as Icart
    ngOnInit(): void {
        this._CartService.getProductCart().subscribe({
            next: (res) => {
                console.log(res.data);
                this.cartItems = res.data

            },
            error: (err) => {
                console.log(err);

            }
        })

    }
    deleteProduct(id: string) {
        this._CartService.deleteProductCart(id).subscribe({
            next: (res) => {
                console.log(res);
                this.cartItems = res.data


            },
            error: (err) => {
                console.log(err);

            }
        })
    }
    clearcart() {
        this._CartService.clearCart().subscribe({
            next: (res) => {
                console.log(res);
                this.cartItems = {} as Icart
            },
            error: (err) => {
                console.log(err);

            }
        })
    }
    updateProductCart(quantity: number, id: string): void {
        this._CartService.updateProductCart(quantity, id).subscribe({
            next: (res) => {
                console.log(res);
                this.cartItems = res.data
                


            },
            error: (err) => {
                console.log(err);

            }
        })





    }
}
