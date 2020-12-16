import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'project-homepage',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: []
})
export class HomepageComponent implements OnInit {
  public _apiUrl: string;

  constructor() { }

  ngOnInit() { }
}
