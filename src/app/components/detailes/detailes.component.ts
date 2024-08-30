import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detailes',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.scss']
})
export class DetailesComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)


  detalisProductSub !: Subscription
  detailesProduct: Iproduct = {} as Iproduct;
  selectedImage: string = '';
  customOptionsDetailes: OwlOptions = {
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
  };
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get("id");
        if (idProduct) {
          this.detalisProductSub = this._ProductsService.getSpacifProduct(idProduct).subscribe({
            next: (res) => {
              this.detailesProduct = res.data;
              this.selectedImage = res.data.images


            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.detalisProductSub.unsubscribe();
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







