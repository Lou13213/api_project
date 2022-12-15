import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  items: Array<any> = new Array<any>()

  constructor() { }

  ngOnInit(): void {
      this.items.push( { name: 'Accueil', display: true })
      this.items.push( { name: 'Avec alcool', display: true })
      this.items.push( { name: 'Sans alcool', display: true })
      this.items.push( { name: 'Tous', display: false })
  }

}
