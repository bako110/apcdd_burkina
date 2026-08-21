import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient.js';

export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => apiClient.get('/partners'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
