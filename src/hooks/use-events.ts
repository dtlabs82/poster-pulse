
import { useState, useEffect } from 'react';
import { fetchEvents } from '@/services/eventService';
import { Event } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useEvents = () => {
  const { data: events = [], isLoading, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return {
    events,
    isLoading,
    error,
    refetch
  };
};
