
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, MapPin, User, ExternalLink, BookmarkPlus, Share2 } from "lucide-react";
import { toast } from "sonner";
import { registerForEvent } from "@/services/eventService";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "@/context/AuthContext";

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationName, setRegistrationName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return null;

  const handleBookmark = () => {
    try {
      // Get existing bookmarks
      const existingBookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
      
      // Check if event is already bookmarked
      if (existingBookmarks.includes(event.id)) {
        toast("Event already bookmarked");
        return;
      }
      
      // Add new bookmark
      const updatedBookmarks = [...existingBookmarks, event.id];
      localStorage.setItem("bookmarkedEvents", JSON.stringify(updatedBookmarks));
      
      toast.success("Event bookmarked");
    } catch (error) {
      toast.error("Failed to bookmark event");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: window.location.href,
        });
        toast.success("Event shared successfully");
      } catch (error) {
        toast.error("Failed to share event");
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    try {
      setIsSubmitting(true);
      const success = await registerForEvent(
        event.id,
        registrationName,
        registrationEmail
      );

      if (success) {
        toast.success("Registration successful!");
        setIsRegistering(false);
        setRegistrationName("");
        setRegistrationEmail("");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Failed to register for event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRegistrationLink = () => {
    window.open(event.registrationLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto animate-zoom-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-primary/10">
              {event.category}
            </Badge>
            <span>by {event.organizer}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-md">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary" size={18} />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-primary" size={18} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={18} />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="text-primary" size={18} />
              <span>{event.organizer}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">About this event</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {isRegistering ? (
            <form onSubmit={handleRegistration} className="space-y-4 border rounded-md p-4">
              <h3 className="font-medium">Register for this event</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={registrationName}
                  onChange={(e) => setRegistrationName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={registrationEmail}
                  onChange={(e) => setRegistrationEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistering(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </Button>
              </div>
            </form>
          ) : null}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleBookmark}>
              <BookmarkPlus size={18} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 size={18} />
            </Button>
          </div>
          {event.registrationLink ? (
            <Button onClick={openRegistrationLink} className="gap-2">
              Register via Google Form <ExternalLink size={16} />
            </Button>
          ) : (
            <Button onClick={() => setIsRegistering(true)} className="gap-2" disabled={isRegistering}>
              Register Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
