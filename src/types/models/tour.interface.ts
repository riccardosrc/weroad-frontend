import { Travel } from "./travel.interface";

export interface Tour {
  id: string;
  name: string;
  endDate: Date;
  startDate: Date;
  price: number;
  travel: Travel;
}
