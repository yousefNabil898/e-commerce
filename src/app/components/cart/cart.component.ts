import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WhishlistService } from '../../core/services/whishlist.service';


@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CurrencyPipe, RouterLink, TranslateModule, NgClass],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    private readonly _CartService = inject(CartService)
    private readonly _ToastrService = inject(ToastrService)
    private readonly _WhishlistService = inject(WhishlistService)
    cartNumber: WritableSignal<Number> = signal(0)


    cartItems: Icart = {} as Icart
    ngOnInit(): void {
        this._CartService.getUserCart().subscribe({
            next: (res) => {
                this._CartService.numCartItems.set(res.numOfCartItems)
                this.cartNumber.set(res.numOfCartItems)

            }
        })
        this._CartService.getProductCart().subscribe({
            next: (res) => {
                console.log(res.data);
                this.cartItems = res.data

            }
        })
        this._WhishlistService.getUserWishlist().subscribe({
            next: (res) => {
                console.log(res);
                this._WhishlistService.numWishIems.set(res.data.length)


            }
        })


    }
    deleteProduct(id: string) {
        this._CartService.deleteProductCart(id).subscribe({
            next: (res) => {
                this._CartService.numCartItems.set(res.numOfCartItems)
                console.log(res.numOfCartItems);
                this.cartItems = res.data
                this._ToastrService.error("Product Deleted", "Fresh cart")


            },
            error: (err) => {
                console.log(err);

            }
        })
    }
    clearcart() {
        this._CartService.clearCart().subscribe({
            next: (res) => {
                this._CartService.numCartItems.set(0)
                this.cartItems = {} as Icart
                this._ToastrService.error("All Products Deleted", "Fresh cart")
                this.cartNumber.set(0)
                


            },
            error: (err) => {
                console.log(err);

            }
        })
    }
    updateProductCart(quantity: number, id: string): void {
        this._CartService.updateProductCart(quantity, id).subscribe({
            next: (res) => {
                console.log(res.numOfCartItems);
                this._CartService.numCartItems.set(res.numOfCartItems)
                this.cartItems = res.data



            },
            error: (err) => {
                console.log(err);

            }
        })





    }
}
