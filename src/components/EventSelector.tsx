import React from 'react';
import { cn } from '@/lib/utils';

const EVENTS = {
  sprints: ['100m', '200m', '400m', '100m/110m Hurdles', '4x100m Relay', '4x400m Relay'],
  distance: ['800m', '1500m', '3000m Steeplechase', '5000m', '10000m'],
  jumps: ['Long Jump', 'Triple Jump', 'High Jump', 'Pole Vault'],
  throws: ['Shot Put', 'Discus', 'Hammer', 'Javelin']
};

interface EventSelectorProps {
  selectedEvent: string;
  onEventSelect: (event: string) => void;
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({
  selectedEvent,
  onEventSelect,
  selectedCategory = 'sprints',
  onCategorySelect
}) => {
  const categories = Object.keys(EVENTS) as (keyof typeof EVENTS)[];

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect?.(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {EVENTS[selectedCategory as keyof typeof EVENTS].map((event) => (
          <button
            key={event}
            onClick={() => onEventSelect(event)}
            className={cn(
              "p-3 rounded-lg text-sm font-medium transition-all duration-200 border",
              selectedEvent === event
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
            )}
          >
            {event}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventSelector;