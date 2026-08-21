import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient.js';

export function useSubmitMembership() {
  return useMutation({
    mutationFn: (data) => apiClient.post('/members', data),
  });
}
