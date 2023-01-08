import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DataService } from '../data.service';
import { Flight } from '../flight.interface';

@Component({
  selector: 'app-flightdeparture',
  templateUrl: './flightdeparture.component.html',
  styleUrls: ['./flightdeparture.component.css']
})

export class FlightdepartureComponent implements OnInit {
  flights: Array<Flight> = new Array<Flight>();
  @Output() eventOut = new EventEmitter<string>()
  isHidden: boolean = false;

  searchForm: UntypedFormGroup
  searchCtrlDestination: FormControl<string>
  searchCtrlFlightnumber: FormControl<string>
  searchCtrlAirlines: FormControl<string>

  constructor(private router: Router, private dataservice:DataService) {
    this.searchCtrlDestination = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    });
    this.searchCtrlFlightnumber = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    });
    this.searchCtrlAirlines = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    });

  this.searchForm = new UntypedFormGroup({
      searchDestination: this.searchCtrlDestination,
      searchFlightnumber: this.searchCtrlFlightnumber,
      searchAirlines: this.searchCtrlAirlines
  })
   }

  ngOnInit(): void {
    this.dataservice.flightdeparture().subscribe(data=>this.flights=data)
    this.searchCtrlDestination.valueChanges.pipe(
      switchMap( (value: string) =>  this.dataservice.GetFlightsToDestination(value))
      ).subscribe((data: Flight[]) => this.flights=data)

    this.searchCtrlFlightnumber.valueChanges.pipe(
      switchMap( (value: string) =>  this.dataservice.GetFlightsToFlightnumber(value))
      ).subscribe((data: Flight[]) => this.flights=data)

    this.searchCtrlAirlines.valueChanges.pipe(
      switchMap( (value: string) =>  this.dataservice.GetFlightsToAirlines(value))
      ).subscribe((data: Flight[]) => this.flights=data)
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
    const order = ['active', 'scheduled'];
    return order.indexOf(a.statut) - order.indexOf(b.statut);
  }
  this.flights.sort(compareFlights);
}
}
