import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, mergeMap, tap, of, from, toArray, filter } from 'rxjs';
import { Flight } from './flight.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  static data = [];
  cache = new Map<string, any>();

  constructor(private http: HttpClient) {}
  arrayCities = [
    { code: 'AMS', name: 'Amsterdam' },
    { code: 'IST', name: 'Istanbul' },
    { code: 'GVA', name: 'Geneve' },
  ];

  getFlights(): Observable<Flight[]> {
    return this.http
      .get(
        'https://aviation-edge.com/v2/public/flights?key=69201f-ee8fdb&arrIata=NCE'
      )
      .pipe(
        tap((x) => console.log(x)),
        map((data: any) => this.obj2ArrayFlights(data))
      );
  }

  getCityName(code: string) {
    return this.http.get(
      'https://aviation-edge.com/v2/public/cityDatabase?key=69201f-ee8fdb&codeIataCity=' +
        code
    );
  }

  getCityNameStatic(code: string) {
    return this.arrayCities.find((el) => el.code === code);
  }
  protected obj2ArrayFlights(tab: any[]): Flight[] {
    console.log(tab);
    return tab.map((el: any) => {
      const c: Flight = {
        iata: el.flight.iataNumber,
        icao: el.flight.icaoNumber,
        flightNumber: parseInt(el.flight.number),
        statut: el.status,
        airline: el.airline.iataCode,
        from: el.departure.iataCode,
        to: el.arrival.iataCode
      };
      return c;
    });
  }

  complique() {
    // Le premier Observable nous renvoie un tableau en un seul morceau.

    // Le but est de faire deux appels par élément du premier tableau

    // Et de stocker la traduction du code de la ville départ et destination

    // Le premier mergeMap éclate le tableau de flight en une séquence de x next() pour chacune des lignes du tableau

    // Le second mergeMap prend la première ligne est la transforme pour récupérer le label correspondant au code

    // Le troisème mergeMap fait la même chose que second sur la destination

    return this.http
      .get<any[]>('https://aviation-edge.com/v2/public/flights?key=69201f-ee8fdb&arrIata=NCE')
      .pipe(
        mergeMap((flights: any[]) => from(flights)),
        mergeMap((flight: any) =>
          this.http.get<any[]>('https://aviation-edge.com/v2/public/cityDatabase?key=69201f-ee8fdb&codeIataCity=' + flight.departure.iataCode).pipe(
            map((cities: any) => {
              if (cities.length > 0 && cities !== undefined) {
              flight.newcities = cities[0].nameCity}
              else {
                //ne pas afficher la ligne si la ville n'est pas connue
                flight.newcities = 'unknown'
              }
              return flight
            })
          )
        ),
        mergeMap((flight: any) =>
          this.http.get<any[]>('https://aviation-edge.com/v2/public/airlineDatabase?key=69201f-ee8fdb&codeIataAirline=' + flight.airline.iataCode).pipe(
            map((airline: any) => {
              if (airline.length > 0) {
              flight.newairline = airline[0].nameAirline}
              else
              {
                //supprimer la ligne entière si l'airline n'est pas connue
                flight.newairline = 'unknown'
              }

              return flight
            })
          )
        ),
        filter( (el: any) => el.newcities !== 'unknown' && el.newairline !== 'unknown'),
        map( (el: any) => {
          //console.log('xx', el)
          const c: Flight = {
            iata: el.flight.iataNumber,
            icao: el.flight.icaoNumber,
            flightNumber: parseInt(el.flight.number),
            statut: el.status,
            airline: el.newairline,
            from: el.newcities,

          };
          return c;
        }),
        toArray()
      )
  }
/*
  compliqueWithCache() {
    this.http
      .get('http://localhost:3000/flights')
      .pipe(
        mergeMap((flights: any[]) => from(flights)),
        mergeMap((flight: any) => {
          const fromCache = this.cache.get(flight.to);
          if (fromCache) {
            console.log('In cache to');
            flight.to = fromCache;
            return of(flight);
          } else {
            return this.http
              .get('http://localhost:3000/cities?code=' + flight.to)
              .pipe(
                map((cities: any[]) => {
                  this.cache.set(flight.to, cities[0].label);
                  flight.to = cities[0].label;
                  return flight;
                })
              );
          }
        }),
        mergeMap((flight: any) => {
          const fromCache = this.cache.get(flight.from);
          if (fromCache) {
            console.log('In cache from');
            flight.from = fromCache;
            return of(flight);
          } else {
            return this.http
              .get('http://localhost:3000/cities?code=' + flight.from)
              .pipe(
                map((cities: any[]) => {
                  this.cache.set(flight.from, cities[0].label);
                  flight.from = cities[0].label;
                  return flight;
                })
              );
          }
        })
      )
      .subscribe((d) => console.log(d));
  }*/
}
