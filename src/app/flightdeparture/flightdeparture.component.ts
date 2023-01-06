import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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
    this.dataservice.complique().subscribe(data=>this.flights=data)
  }

}
