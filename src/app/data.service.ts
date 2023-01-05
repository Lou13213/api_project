import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, Observable, switchMap, tap } from 'rxjs';
import { Flight } from './flight.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  arrayCities = [{code: 'AMS', name: "Amsterdam"},{code: 'IST', name: "Istanbul"},{code: 'GVA', name: 'Geneve'}]

  getFlights(): Observable<Flight[]> {
    return this.http.get('https://aviation-edge.com/v2/public/flights?key=69201f-ee8fdb&arrIata=NCE').pipe(
      tap( x => console.log(x) ),
      map( (data: any) => this.obj2ArrayFlights(data) )
    )
  }

  getCityName(code:string){
    return this.http.get('https://aviation-edge.com/v2/public/cityDatabase?key=69201f-ee8fdb&codeIataCity='+code)
  }

  getCityNameStatic(code:string){
    return this.arrayCities.find( el => el.code === code)
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
        departure: this.getCityNameStatic(el.departure.iataCode)?.name
      }
        return c
  })
}

}
