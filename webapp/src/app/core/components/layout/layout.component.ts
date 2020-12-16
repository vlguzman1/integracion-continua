import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";

import { filter } from 'rxjs/operators';

import * as fromServicesShared from '@shared/services';

declare var gtag;

@Component({
  selector: 'project-layout',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./layout.component.scss'],
  templateUrl: './layout.component.html',
  providers: [fromServicesShared.UtilsService]
})
export class LayoutComponent {
  public route: string = '';
  public isMobile: boolean = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public router: Router,
    public location: Location,
    private _title: Title
  ) {
    this.matIconRegistry.addSvgIcon(
      'project-login',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/icons/icon-login.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'project-doc',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/icons/icon-doc.svg')
    );

    this.isMobile = window.innerWidth < 768 ? true : false;

    this.router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = '';
      }
    });

    const navEndEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      const path = event.urlAfterRedirects === '/' ? '/orientacion-financiera' : event.urlAfterRedirects;
      gtag('config', 'UA-165306115-1', {
        'page_path': path
      });

      this.updateTitle(path);
    });
  }

  updateTitle(path) {
    let title = '';
    switch(path.slice(1, path.length)) {
      case 'login':
        title = 'Inicia Sesión';
        break;
      case 'registro':
        title = 'Regístrate';
        break;
      case 'recuperar-contrasena':
        title = 'Recupera tu Contraseña';
        break;
      case 'solicitar':
        title = 'Solicitar Crédito';
        break;
      case 'admin':
        title = 'Administración';
        break;
      case 'orientacion-financiera':
        title = 'Orientación financiera';
        break;
    }
    this._title.setTitle(`${title} - Project`);
  }
}
