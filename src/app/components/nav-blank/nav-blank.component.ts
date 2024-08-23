import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
private readonly _AuthService =inject(AuthService)


signOut(){
  this._AuthService.logOut()
}
}
