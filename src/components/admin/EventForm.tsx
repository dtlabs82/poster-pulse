
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventFormData } from "@/types";
import { Upload, Image, X } from "lucide-react";
import { toast } from "sonner";

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  isLoading: boolean;
}

const INITIAL_FORM_STATE: EventFormData = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  time: "12:00",
  venue: "",
  category: "General",
  organizer: "",
  registrationLink: "",
  image: null,
  featured: false,
};

const CATEGORIES = [
  "General",
  "Academic",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Conference",
  "Competition",
  "Other",
];

const EventForm: React.FC<EventFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<EventFormData>(INITIAL_FORM_STATE);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size exceeds 5MB");
          return;
        }
        setFormData((prev) => ({ ...prev, image: file }));
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
      } else {
        toast.error("Only image files are allowed");
      }
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an event poster");
      return;
    }

    if (!formData.title || !formData.date || !formData.venue) {
      toast.error("Please fill all required fields");
      return;
    }

    onSubmit(formData);
    
    // Reset form after submission
    if (!isLoading) {
      setFormData(INITIAL_FORM_STATE);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>
            Fill in the details to create a new event posting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Event Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">
                Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">
                Time <span className="text-destructive">*</span>
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">
                Venue <span className="text-destructive">*</span>
              </Label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="Enter venue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizer">
                Organizer <span className="text-destructive">*</span>
              </Label>
              <Input
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                placeholder="Enter organizer name"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="registrationLink">
                Registration Link (Google Form) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="registrationLink"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleInputChange}
                placeholder="Enter Google Form link"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="featured">Feature this event</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Featured events are highlighted on the homepage
              </p>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="image">
                Event Poster <span className="text-destructive">*</span>
              </Label>

              {!previewUrl ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-foreground">
                      Drag and drop an image
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      PNG, JPG or JPEG (max 5MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("posterUpload")?.click()
                      }
                    >
                      Select File
                    </Button>
                    <input
                      id="posterUpload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[3/4] max-w-[300px] mx-auto">
                  <img
                    src={previewUrl}
                    alt="Event poster preview"
                    className="rounded-lg object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Event"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EventForm;
