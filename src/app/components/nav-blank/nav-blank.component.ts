import { WhishlistService } from './../../core/services/whishlist.service';
import { Component, computed, HostListener, inject, OnInit, Renderer2, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule,NgClass],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent   {
  private readonly _AuthService = inject(AuthService)
  private readonly _MytranslateService = inject(MytranslateService)
  private readonly _CartService = inject(CartService)
  readonly _TranslateService = inject(TranslateService)
  readonly _WhishlistService = inject(WhishlistService)
  readonly _Renderer2 = inject(Renderer2)
  isScrolled = false;
  navCount: Signal<Number> = computed(() => this._CartService.numCartItems())
  navWishList: Signal<Number> = computed(() => this._WhishlistService.numWishIems())
 

  signOut() {
    this._AuthService.logOut()
  }
  change(lang: string): void {
    this._MytranslateService.changeLang(lang)
  }
  
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollOffset =  document.documentElement.scrollTop ;
      this.isScrolled = scrollOffset > 25; 
    }
  
}
