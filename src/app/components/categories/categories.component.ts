import { CartService } from './../../core/services/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { WhishlistService } from '../../core/services/whishlist.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _WhishlistService = inject(WhishlistService);
  allCategoriesSub!: Subscription
  allCategories = signal<Icategory[]>([])
  skeletonArray = Array(10).fill(0);

  ngOnInit(): void {
    this.allCategoriesSub = this._CategoriesService.getAllcategories().subscribe({
      next: (res) => {
        console.log(res);
        this.allCategories.set(res.data)

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
    this.allCategoriesSub.unsubscribe()
  }

}
