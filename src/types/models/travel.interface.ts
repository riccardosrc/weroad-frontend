import { Tour } from "./tour.interface";

export interface Travel {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  days: number;
  nights: number;
  cheapestTour: number;
  firstAvailableDate: Date;
  mood: TravelMood;
  tours: Tour[];
}

export interface TravelMood {
  id: string;
  culture: number;
  nature: number;
  history: number;
  relax: number;
  party: number;
}
