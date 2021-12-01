import { IPassenger } from './passenger.interface';

export interface IFlight {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: IPassenger[];
}
