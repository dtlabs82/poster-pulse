
import React, { useState, useEffect } from "react";
import { Event } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface FeaturedEventsProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events, onEventClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredEvents = events.filter((event) => event.featured);

  if (featuredEvents.length === 0) return null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredEvents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  return (
    <div className="relative overflow-hidden rounded-xl mb-8">
      <Carousel orientation="horizontal" className="w-full">
        <CarouselContent>
          {featuredEvents.map((event) => (
            <CarouselItem key={event.id}>
              <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                  <div className="max-w-2xl">
                    <h2 className="text-xl md:text-3xl font-bold text-white mb-2 animate-slide-up">
                      {event.title}
                    </h2>
                    <p className="text-white/80 mb-4 hidden md:block animate-slide-up" style={{ animationDelay: "100ms" }}>
                      {event.description.substring(0, 120)}
                      {event.description.length > 120 ? "..." : ""}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
                      <span className="bg-white/20 text-white px-2 py-1 rounded-md text-sm">
                        {formatDate(event.date)}
                      </span>
                      <span className="bg-white/20 text-white px-2 py-1 rounded-md text-sm">
                        {event.venue}
                      </span>
                    </div>
                    <Button 
                      onClick={() => onEventClick(event)}
                      className="animate-slide-up" 
                      style={{ animationDelay: "300ms" }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-black/50 text-white hover:bg-black/70" />
        <CarouselNext className="right-4 bg-black/50 text-white hover:bg-black/70" />
      </Carousel>
    </div>
  );
};

export default FeaturedEvents;
