import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Flight } from '../flight.interface';

@Component({
  selector: 'app-flight',
  templateUrl: './flightarrival.component.html',
  styleUrls: ['./flightarrival.component.css']
})
export class FlightComponent implements OnInit {

  flights: any[] = [];
  @Output() eventOut = new EventEmitter<string>()
  isHidden: boolean = false;

  constructor(private router: Router, private dataservice:DataService) { }

  ngOnInit(): void {
    this.dataservice.flightarrivaltest().subscribe(
      data => {
        console.log(data)
        this.flights=data,
        this.sortFlights();
      })
  }
  onTrackFlight(flight: any) {
    console.log('Tracking flight', flight);
    const url = `https://flightaware.com/live/flight/${flight.icao}`;
    window.open(url, '_blank');
    console.log('Finished tracking flight');
  }

  formatDate(estimatedTimeArrival: any) {
    const date = new Date(estimatedTimeArrival);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let output = '';

    if (hours < 10) {
      output += '0';
    }

    output += hours + ':';

    if (minutes < 10) {
      output += '0';
    }

    output += minutes;

    return output;
  }
  sortFlights() {

  function compareFlights(a: Flight, b: Flight) {
    const order = ['landed', 'active', 'scheduled'];
    return order.indexOf(a.statut) - order.indexOf(b.statut);
  }
  this.flights.sort(compareFlights);
}
}


