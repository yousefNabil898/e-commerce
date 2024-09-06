import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _platId = inject(PLATFORM_ID)
  constructor() {
    if (isPlatformBrowser(this._platId)) {
      let lang = localStorage.getItem("lang")
      this._TranslateService.setDefaultLang("en")
      if (lang !== null) {
        this._TranslateService.use(lang!)

      }
      this.changeDirction()
    }

  }
  changeDirction() {
    let lang = localStorage.getItem("lang")
    if (lang === "en") {
      document.documentElement.dir = "ltr"

    } else if (lang === "ar") {
      document.documentElement.dir = "rtl"

    }
  }
  changeLang(lang: string) {
    if (isPlatformBrowser(this._platId)) {
      localStorage.setItem("lang", lang)
      this._TranslateService.use(lang)
      this.changeDirction()
    }
  }
}
