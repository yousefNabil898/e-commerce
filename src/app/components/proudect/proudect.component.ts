import { Component, ElementRef, Renderer2, signal } from '@angular/core';
import { inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { map, Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from '../../core/pipes/category.pipe';
import { WhishlistService } from '../../core/services/whishlist.service';
import { WishlistCheckerPipe } from '../../core/pipes/wish-list-check.pipe';

@Component({
  selector: 'app-proudect',
  standalone: true,
  imports: [CarouselModule, FormsModule, WishlistCheckerPipe, NgClass, RouterLink, CurrencyPipe, NgFor, TranslateModule, SearchPipe, CategoryPipe],
  templateUrl: './proudect.component.html',
  styleUrl: './proudect.component.scss'
})
export class ProudectComponent implements OnInit, OnDestroy {
  productList = signal<Iproduct[]>([]);
  wishlistProducts = signal<string[]>([]);
  categoryList = signal<Icategory[]>([]);
  searchWord = signal<string>('');
  selectedValue = signal<string>('');

  allProductSub!: Subscription;
  allCategorySub!: Subscription;
  allWishListSub!: Subscription;
  skeletonArray = Array(20).fill(0);
  options = [
    { value: "", label: "all categories" },
    { value: "Women's Fashion", label: "Women's Fashion" },
    { value: "Men's Fashion", label: "Men's Fashion" },
    { value: 'Electronics', label: 'Electronics' }
  ];

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _WhishlistService = inject(WhishlistService);
  private readonly _ToastrService = inject(ToastrService);

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this._CartService.numCartItems.set(res.numOfCartItems);
      }
    });

    this.allProductSub = this._ProductsService.getAllProducts().pipe(
      map((res: any) => ({
        ...res,
        data: res.data.map((product: any) => ({
          ...product,
          isWishList: false
        }))
      }))
    ).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        console.log(this.productList());
      },
    });

    this.allCategorySub = this._CategoriesService.getAllcategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      }
    });

    this.allWishListSub = this._WhishlistService.getUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistProducts.set(res.data);
        this._WhishlistService.numWishIems.set(res.count);
        console.log(this.wishlistProducts());
      }
    });
  }

  ngOnDestroy(): void {
    this.allProductSub?.unsubscribe();
    this.allCategorySub?.unsubscribe();
    this.allWishListSub?.unsubscribe();

  }

  addProductToCart(id: string) {
    this._CartService.addProductCart(id).subscribe({
      next: (res) => {
        this._CartService.numCartItems.set(res.numOfCartItems);
        const message = localStorage.getItem("lang") === "en" ? res.message : "تم اضافة المنتج الي عربة التسوق";
        this._ToastrService.success(message, "Fresh Cart");
      }
    });
  }

  whishlist(event: MouseEvent, id: string): void {
    const heart = event.target as HTMLElement;
    console.log(heart);

    if (heart) {
      if (heart.classList.contains('text-danger')) {
        this.renderer.removeClass(heart, 'text-danger');
        this._WhishlistService.deletePrdcutWishlist(id).subscribe({
          next: (res) => {
            this._WhishlistService.numWishIems.set(res.data.length);
            const message = localStorage.getItem("lang") === "en" ? res.message : "تم حذف المنتج من المفضلة";
            this._ToastrService.success(message, "Fresh Cart");
          }
        });
      } else {
        this.renderer.addClass(heart, 'text-danger');
        this._WhishlistService.addProdcutWishlist(id).subscribe({
          next: (res) => {
            this._WhishlistService.numWishIems.set(res.data.length);
            const message = localStorage.getItem("lang") === "en" ? res.message : "تم اضافة المنتج من المفضلة";
            this._ToastrService.success(message, "Fresh Cart");
          }
        });
      }
    } else {
      console.log('العنصر غير موجود');
    }
  }
}
