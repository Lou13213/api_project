export interface Flight {
  iata: string;
  icao: string;
  flightNumber: string;
  statut: string;
  airline: string;
  from: string;
  to?: string;
  terminal?: string;
  estimatedTimeArrival?: string;
  estimatedTimeDeparture?: string;
}
