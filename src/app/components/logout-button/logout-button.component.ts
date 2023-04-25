import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {default as auth0} from '../../../../auth0_config.json';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  logout(): void {
    console.log(this.doc.location.origin);
    this.auth.logout({ returnTo: auth0.logout_url });
  }
}
