import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import {  Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly _BrandsService = inject(BrandsService)
  private readonly _ProductsService = inject(ProductsService)


  allBrandsub!: Subscription
  ngOnInit(): void {
    this.allBrandsub = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);

      }
    })
  }

  ngOnDestroy(): void {
    this.allBrandsub.unsubscribe()
  }

}
