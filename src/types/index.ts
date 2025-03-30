
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: "General" | "Academic" | "Cultural" | "Sports" | "Workshop" | "Seminar" | "Conference" | "Competition" | "Other";
  organizer: string;
  registrationLink: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

export type EventFormData = Omit<Event, "id" | "createdAt" | "imageUrl"> & {
  image: File | null;
};

export interface Profile {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
  role: "admin" | "student";
  created_at: string;
  updated_at: string;
}
