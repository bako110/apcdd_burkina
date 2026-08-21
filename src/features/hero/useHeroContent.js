import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient.js';

export function useHeroContent() {
  return useQuery({
    queryKey: ['content'],
    queryFn: () => apiClient.get('/content'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
