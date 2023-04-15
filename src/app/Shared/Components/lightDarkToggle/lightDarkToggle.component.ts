import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'themeToggle',
  templateUrl: './lightDarkToggle.component.html',
  styleUrls: ['./lightDarkToggle.component.scss']
})
export class LightDarkToggleComponent implements OnInit {

  @Input() isLight: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
