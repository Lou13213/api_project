import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  flights: any[] = [];
  @Output() eventOut = new EventEmitter<string>()
  isHidden: boolean = false;

  constructor(private router: Router, private dataservice:DataService) { }

  ngOnInit(): void {
    this.dataservice.getFlights().subscribe(data=>this.flights=data)
  }

}
