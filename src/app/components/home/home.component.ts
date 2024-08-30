import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  productList: Iproduct[] = []
  categoryList: Icategory[] = []
  allProductsub !: Subscription
  allCategorysub !: Subscription
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)


  customOptionscat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  customOptionsproduct: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 50000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
  customOptionsmain: OwlOptions = {
    loop: true,
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
  }



  ngOnInit(): void {
    this.allProductsub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data
      },
      error: (err) => {
        console.log(err);

      },
    })

    this.allCategorysub = this._CategoriesService.getAllcategories().subscribe({
      next: (res) => {
        this.categoryList = res.data
      },
      error: (err) => {
        console.log(err);

      },
    })

  }
  ngOnDestroy(): void {
    this.allProductsub?.unsubscribe()
    this.allCategorysub?.unsubscribe()
  }
  addProductToCart(id: string) {
    this._CartService.addProductCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, "Fresh Cart")
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
