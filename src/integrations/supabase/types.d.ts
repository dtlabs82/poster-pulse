
// This file contains TypeScript types for our Supabase database
export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Registration = Database['public']['Tables']['registrations']['Row']
