export interface Flight {
  iata: string
  icao: string
  flightNumber: number
  statut: string
  airline: string
  from: string
  to?: string
}
