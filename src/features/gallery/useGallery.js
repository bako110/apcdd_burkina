import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient.js';

export function useGallery() {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: () => apiClient.get('/gallery'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
