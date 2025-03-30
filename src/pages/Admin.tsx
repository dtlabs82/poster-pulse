
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EventForm from "@/components/admin/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventFormData } from "@/types";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { createEvent } from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, profile, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  // Redirect if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/auth" />;
  }

  const handleCreateEvent = async (formData: EventFormData) => {
    if (!user) {
      toast.error("You must be logged in to create events");
      return;
    }

    try {
      setIsLoading(true);
      const newEvent = await createEvent(formData, user.id);
      
      if (newEvent) {
        toast.success("Event created successfully!");
        // Invalidate events query to refetch the list
        queryClient.invalidateQueries({ queryKey: ['events'] });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 container mx-auto py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={16} className="mr-1" /> Back to Events
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-8">Admin Dashboard</h1>
        </div>

        <EventForm onSubmit={handleCreateEvent} isLoading={isLoading} />
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} College Event Manager
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
