import { Tour } from "../models/tour.interface";

export interface CreateTourInput
  extends Omit<Tour, "id" | "travel" | "endDate"> {
  travelId?: string;
}
