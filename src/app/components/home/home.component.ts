import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProudectComponent } from '../proudect/proudect.component';
import { SearchPipe } from '../../core/pipes/search.pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, CurrencyPipe, TranslateModule, ProudectComponent,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  categoryList: Icategory[] = []
  allCategorysub !: Subscription
  private readonly _CategoriesService = inject(CategoriesService)


  customOptionscat: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navSpeed: 500,
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

  customOptionsmain: OwlOptions = {
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
  }



  ngOnInit(): void {
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
    this.allCategorysub?.unsubscribe()
  }

}
