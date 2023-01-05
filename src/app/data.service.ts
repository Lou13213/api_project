import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Flight } from './flight.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getFlights(): Observable<Flight[]> {
    return this.http.get('https://aviation-edge.com/v2/public/flights?key=69201f-ee8fdb&arrIata=NCE').pipe(
      tap(x=>console.log(x)),
        map( (data: any) => this.obj2ArrayFlights(data) )
    )
}

protected obj2ArrayFlights(tab: any[]): Flight[] {

console.log(tab)
  return tab.map( (el: any) => {
      const c: Flight = {
        iata: el.flight.iataNumber,
        icao: el.flight.icaoNumber,
        flightNumber: parseInt(el.flight.number),
        statut: el.status,
        airline: el.airline.iataCode,
        departure: el.departure.iataCode
      }

      return c
  })
}

}
