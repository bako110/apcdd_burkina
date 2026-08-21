import { useQuery } from '@tanstack/react-query';
import { EVENT_STATUS_PRIORITY } from '../../shared/constants.js';
import { apiClient } from '../../lib/apiClient.js';
import { findIdBySlug } from '../../lib/slug.js';

function sortEvents(events) {
  return [...events].sort((a, b) => {
    const priorityDiff = (EVENT_STATUS_PRIORITY[a.status] ?? 99) - (EVENT_STATUS_PRIORITY[b.status] ?? 99);
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(a.date) - new Date(b.date);
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const data = await apiClient.get('/events');
      return sortEvents(data ?? []);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useEventBySlug(slug) {
  const eventsQuery = useEvents();
  const id = eventsQuery.data ? findIdBySlug(eventsQuery.data, slug) : null;

  const eventQuery = useQuery({
    queryKey: ['events', id],
    queryFn: () => apiClient.get(`/events/${id}`),
    enabled: !!id,
    retry: 1,
  });

  const slugNotFound = eventsQuery.isSuccess && !id;

  return {
    ...eventQuery,
    isLoading: eventsQuery.isLoading || (!!id && eventQuery.isLoading),
    isError: eventQuery.isError || eventsQuery.isError || slugNotFound,
  };
}
