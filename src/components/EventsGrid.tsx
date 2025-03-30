
import React from "react";
import { Event } from "@/types";
import EventCard from "./EventCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface EventsGridProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const EventsGrid: React.FC<EventsGridProps> = ({ events, onEventClick }) => {
  const isMobile = useIsMobile();

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex snap-x snap-mandatory overflow-x-auto pb-6 gap-4 px-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="snap-center flex-shrink-0 w-[280px]"
          >
            <EventCard event={event} onClick={() => onEventClick(event)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
};

export default EventsGrid;
