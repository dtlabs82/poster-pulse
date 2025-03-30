
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Event } from "@/types";

interface EventFiltersProps {
  events: Event[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  events,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
}) => {
  // Extract unique categories from events
  const categories = ["All", ...new Set(events.map((event) => event.category))];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-muted-foreground" />
        <h3 className="font-medium">Filters</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateDesc">Latest First</SelectItem>
            <SelectItem value="dateAsc">Earliest First</SelectItem>
            <SelectItem value="titleAsc">Title A-Z</SelectItem>
            <SelectItem value="titleDesc">Title Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EventFilters;
