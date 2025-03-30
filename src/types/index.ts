
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  organizer: string;
  registrationLink: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

export type EventFormData = Omit<Event, "id" | "createdAt" | "imageUrl"> & {
  image: File | null;
};
