import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMenu = false;

  constructor() { }
  
  toggleMenu(){
    this.isMenu = !this.isMenu;
  }
  ngOnInit() {
  }

}
