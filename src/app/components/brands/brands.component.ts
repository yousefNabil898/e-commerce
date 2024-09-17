import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart.service';
import { WhishlistService } from '../../core/services/whishlist.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly _BrandsService = inject(BrandsService)
  private readonly _CartService = inject(CartService);
  private readonly _WhishlistService = inject(WhishlistService);
  skeletonArray = Array(20).fill(0);



  allBrands = signal<Ibrands[]>([])

  allBrandsub!: Subscription
  ngOnInit(): void {
    this.allBrandsub = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.allBrands.set(res.data)

      }
    })

    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this._CartService.numCartItems.set(res.numOfCartItems);
      }
    });

    this._WhishlistService.getUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this._WhishlistService.numWishIems.set(res.count);
      }
    });
  }

  ngOnDestroy(): void {
    this.allBrandsub.unsubscribe()
  }

}
