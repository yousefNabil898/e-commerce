import { Component, inject, Input, signal } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CategoryFilterIdPipe } from '../../pipes/category-filter-id.pipe';

@Component({
  selector: 'app-recomnded-products',
  standalone: true,
  imports: [CarouselModule,RouterLink,TranslateModule,CategoryFilterIdPipe,NgIf],
  templateUrl: './recomnded-products.component.html',
  styleUrl: './recomnded-products.component.scss'
})
export class RecomndedProductsComponent {
@Input() productCategory: string = '';

//#region  Services
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);

  private readonly _ToastrService = inject(ToastrService);

//#endregion
isLoading: boolean = true;
@Input() searhWords: string = "";
@Input() categoryFilterWord: string = "";
productList = signal<Iproduct[]>([]);
allProductSub!: Subscription;
skeletonArray = Array(5).fill(0);

ngOnInit(): void {
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
          this.isLoading = false;
          
          
  
        },
      });
  
}
customOptionscat: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  };
ngOnDestroy(): void {
  this.allProductSub?.unsubscribe();
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
}
