
import React, { useState, useEffect } from "react";
import { calculateTimeLeft } from "@/lib/utils";

interface EventCountdownProps {
  eventDate: string;
}

const EventCountdown: React.FC<EventCountdownProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDate));

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      const updated = calculateTimeLeft(eventDate);
      setTimeLeft(updated);
      
      if (!updated) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!timeLeft) {
    return null; // Event has passed
  }

  return (
    <div className="bg-primary/10 rounded-lg p-4 animate-pulse-glow">
      <h3 className="text-sm font-medium mb-2 text-center">Event starts in</h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <span className="text-xs text-muted-foreground">Days</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <span className="text-xs text-muted-foreground">Hours</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <span className="text-xs text-muted-foreground">Mins</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <span className="text-xs text-muted-foreground">Secs</span>
        </div>
      </div>
    </div>
  );
};

export default EventCountdown;
