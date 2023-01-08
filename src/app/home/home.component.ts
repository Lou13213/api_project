import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  showFlight = true;
  showFlightDeparture = false;

  toggleFlight() {
    this.showFlight = !this.showFlight;
  }

  toggleFlightDeparture() {
    this.showFlightDeparture = !this.showFlightDeparture;
    this.showFlight = !this.showFlightDeparture;
  }

  ngOnInit(): void {
  }

}
