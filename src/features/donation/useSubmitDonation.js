import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient.js';

export function useSubmitDonation() {
  return useMutation({
    mutationFn: (data) => apiClient.post('/donations', data),
  });
}
