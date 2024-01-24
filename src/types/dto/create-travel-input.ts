import { Travel, TravelMood } from "../models/travel.interface";

export interface CreateTravelInput
  extends Omit<
    Travel,
    "id" | "cheapestTour" | "nights" | "firstAvailableDate" | "tours" | "mood"
  > {
  mood: Omit<TravelMood, "id">;
}
