
import React from "react";
import { Calendar, MapPin, Clock, User } from "lucide-react";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div
      className="glass-card rounded-lg overflow-hidden event-card-hover cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="event-image-container">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-image"
          loading="lazy"
        />
        {event.featured && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-accent text-accent-foreground animate-pulse-glow">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-1 mb-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={14} />
            <span className="line-clamp-1">{event.organizer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
