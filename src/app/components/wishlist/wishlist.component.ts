import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { WhishlistService } from '../../core/services/whishlist.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, TranslateModule, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _WhishlistService = inject(WhishlistService);
  private readonly _ToastrService = inject(ToastrService);

  wishListProducts = signal<Iproduct[]>([]);
  numWishItems = signal<number>(0);
  numCartItems = signal<number>(0);

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this._CartService.numCartItems.set(res.numOfCartItems);
      }
    });

    this._WhishlistService.getUserWishlist().subscribe({
      next: (res: any) => {
        this.wishListProducts.set(res.data);
        this._WhishlistService.numWishIems.set(res.count)

      }
    });
  }

  removeProduct(id: string): void {
    this._WhishlistService.deletePrdcutWishlist(id).subscribe({
      next: (res: any) => {
        this.showSuccessMessage(res.message, 'Product removed from wishlist');
        this._WhishlistService.getUserWishlist().subscribe({
          next: (res: any) => {
            this.wishListProducts.set(res.data);
            this.numWishItems.set(res.data.length);
          }
        });
      }
    });
  }

  addProductToCart(id: string): void {
    this._CartService.addProductCart(id).subscribe({
      next: (res: any) => {
        this.numCartItems.set(res.numOfCartItems);
        this.removeProduct(id);
        this.showSuccessMessage(res.message, 'Product added to cart');
      }
    });
  }

  private showSuccessMessage(message: string, title: string): void {
    if (localStorage.getItem('lang') === 'en') {
      this._ToastrService.success(message, title);
    } else if (localStorage.getItem('lang') === 'ar') {
      this._ToastrService.success('تم ' + message, title);
    }
  }
}
