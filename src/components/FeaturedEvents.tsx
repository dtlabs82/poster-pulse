
import React, { useState, useEffect, useRef } from "react";
import { Event } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";

interface FeaturedEventsProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events, onEventClick }) => {
  const featuredEvents = events.filter((event) => event.featured);
  const isMobile = useIsMobile();
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  if (featuredEvents.length === 0) return null;

  return (
    <div className="relative overflow-hidden mb-8">
      <h2 className="text-2xl font-bold mb-4 px-4">Featured Events</h2>
      <Carousel 
        opts={{ 
          align: "center",
          loop: true
        }}
        plugins={[autoplayRef.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredEvents.map((event, index) => (
            <CarouselItem 
              key={event.id} 
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 transition-all duration-500"
            >
              <div 
                className="relative overflow-hidden rounded-xl group cursor-pointer h-full transform transition-transform duration-500 hover:scale-[1.02]"
                onClick={() => onEventClick(event)}
                style={{ 
                  perspective: "1000px", 
                  transformStyle: "preserve-3d" 
                }}
              >
                <div className="h-full transform transition-transform duration-500 group-hover:rotate-y-3">
                  <div className="relative h-[500px] md:h-[600px]">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                      <div className="max-w-xl">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 animate-slide-up">
                          {event.title}
                        </h3>
                        <p className="text-white/80 mb-3 hidden md:block animate-slide-up line-clamp-2" 
                           style={{ animationDelay: "100ms" }}>
                          {event.description.substring(0, 120)}
                          {event.description.length > 120 ? "..." : ""}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3 animate-slide-up" 
                             style={{ animationDelay: "200ms" }}>
                          <span className="bg-white/20 text-white px-2 py-1 rounded-md text-sm">
                            {formatDate(event.date)}
                          </span>
                          <span className="bg-white/20 text-white px-2 py-1 rounded-md text-sm">
                            {event.venue}
                          </span>
                        </div>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                          className="animate-slide-up" 
                          style={{ animationDelay: "300ms" }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 bg-black/50 text-white hover:bg-black/70" />
          <CarouselNext className="right-4 bg-black/50 text-white hover:bg-black/70" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedEvents;
