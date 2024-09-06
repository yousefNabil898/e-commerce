import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _MytranslateService = inject(MytranslateService)
   readonly _TranslateService = inject(TranslateService)


  signOut() {
    this._AuthService.logOut()
  }
  change(lang: string): void {
    this._MytranslateService.changeLang(lang)
  }

}
