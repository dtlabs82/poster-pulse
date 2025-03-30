
import { supabase } from '@/integrations/supabase/client';
import { EventFormData, Event } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(event => ({
      ...event,
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      category: event.category,
      organizer: event.organizer,
      registrationLink: event.registration_link,
      imageUrl: event.image_url,
      featured: event.featured || false,
      createdAt: event.created_at
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    toast.error('Failed to fetch events');
    return [];
  }
};

export const createEvent = async (formData: EventFormData, userId: string): Promise<Event | null> => {
  try {
    if (!formData.image) {
      throw new Error('Event poster is required');
    }

    // Upload image to storage
    const fileExt = formData.image.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('event_posters')
      .upload(filePath, formData.image);

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from('event_posters')
      .getPublicUrl(filePath);

    // Convert string category to proper enum value
    // This ensures we're using the correct type for the category field
    const categoryValue = formData.category as "General" | "Academic" | "Cultural" | 
      "Sports" | "Workshop" | "Seminar" | "Conference" | "Competition" | "Other";

    // Insert event into database
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        category: categoryValue,
        organizer: formData.organizer,
        registration_link: formData.registrationLink,
        image_url: urlData.publicUrl,
        featured: formData.featured,
        created_by: userId
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      venue: data.venue,
      category: data.category,
      organizer: data.organizer,
      registrationLink: data.registration_link,
      imageUrl: data.image_url,
      featured: data.featured || false,
      createdAt: data.created_at
    };
  } catch (error) {
    console.error('Error creating event:', error);
    toast.error('Failed to create event');
    return null;
  }
};

export const registerForEvent = async (eventId: string, name: string, email: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('registrations')
      .insert({
        event_id: eventId,
        student_name: name,
        student_email: email
      });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error registering for event:', error);
    toast.error('Failed to register for event');
    return false;
  }
};
