import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DetailesProduct } from '../../core/interfaces/detailes-product';
import { WhishlistService } from '../../core/services/whishlist.service';

@Component({
  selector: 'app-detailes',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe, TranslateModule],
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.scss']
})
export class DetailesComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _WhishlistService = inject(WhishlistService);
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)


  detalisProductSub !: Subscription
  detailesProduct: DetailesProduct = {} as DetailesProduct;
  selectedImage: string = '';
  customOptionsDetailes: OwlOptions = {
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
    items: 1,
    nav: false
  };
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
          this._CartService.numCartItems.set(res.numOfCartItems)
          console.log(res);

      }
  })
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get("id");
        if (idProduct) {
          this.detalisProductSub = this._ProductsService.getSpacifProduct(idProduct).subscribe({
            next: (res) => {
              console.log("res", res);

              this.detailesProduct = res.data;
              console.log("detailesProduct", this.detailesProduct);

              this.selectedImage = res.data.images


            }
          });
        }
      }
    });
    this._WhishlistService.getUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this._WhishlistService.numWishIems.set(res.data.length)


      }
    });

  }
  ngOnDestroy(): void {
    this.detalisProductSub.unsubscribe();
  }





  addProductToCart(id: string) {
    this._CartService.addProductCart(id).subscribe({
      next: (res) => {
        this._CartService.numCartItems.set(res.numOfCartItems)
        this._ToastrService.success(res.message, "Fresh Cart")
      }
    })
  }
}







