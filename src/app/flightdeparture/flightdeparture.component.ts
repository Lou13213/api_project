import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Flight } from '../flight.interface';

@Component({
  selector: 'app-flightdeparture',
  templateUrl: './flightdeparture.component.html',
  styleUrls: ['./flightdeparture.component.css']
})

export class FlightdepartureComponent implements OnInit {
  flights: any[] = [];
  @Output() eventOut = new EventEmitter<string>()
  isHidden: boolean = false;

  constructor(private router: Router, private dataservice:DataService) { }

  ngOnInit(): void {
    this.dataservice.flightdeparture().subscribe(data=>this.flights=data)
  }

  onTrackFlight(flight: any) {
    console.log('Tracking flight', flight);
    const url = `https://flightaware.com/live/flight/${flight.icao}`;
    window.open(url, '_blank');
    console.log('Finished tracking flight');
  }
}
