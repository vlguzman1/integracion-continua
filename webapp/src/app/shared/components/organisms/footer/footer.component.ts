import { Component } from '@angular/core';

@Component({
  selector: 'project-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public site: string = 'Area Andina Simulador';
  public year: any = new Date();

  constructor() {

  }
}
