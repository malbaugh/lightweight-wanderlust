export interface Flight {
  departure: boolean;
  destination: string;
  airport: string;
  arrival: string;
}
export interface Trip {
  flights: Flight[];
  airline: string;
  cost: string;
}
export interface FlightInfo {
  outboundTrip: Trip;
  inboundTrip: Trip;
}