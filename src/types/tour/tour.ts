export interface Trip {
  id: string;
  userId: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
  itinerary: string[];
  photos: string[];
}
