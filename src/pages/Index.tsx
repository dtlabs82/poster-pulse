
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import FeaturedEvents from "@/components/FeaturedEvents";
import EventsGrid from "@/components/EventsGrid";
import EventFilters from "@/components/EventFilters";
import EventDetailsModal from "@/components/EventDetailsModal";
import DotPattern from "@/components/DotPattern";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Event } from "@/types";
import { sortEvents, filterEvents } from "@/lib/utils";
import { useEvents } from "@/hooks/use-events";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { events, isLoading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("dateDesc");
  const { user, profile, signOut } = useAuth();

  const filteredEvents = filterEvents(events, searchQuery, selectedCategory);
  const sortedEvents = sortEvents(filteredEvents, sortOption);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dot pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          glow={true}
          className="text-primary/20 dark:text-primary/10"
          cr={1.5}
        />
      </div>

      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container mx-auto py-6 flex-1 relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        ) : (
          <>
            <FeaturedEvents
              events={events.filter(event => event.featured)}
              onEventClick={handleEventClick}
            />

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 px-4">
                <h2 className="text-2xl font-bold">All Events</h2>
              </div>

              <EventFilters
                events={events}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />

              <EventsGrid
                events={sortedEvents}
                onEventClick={handleEventClick}
              />
            </div>
          </>
        )}
      </main>

      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <footer className="bg-muted py-6 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sathyabama Events
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
