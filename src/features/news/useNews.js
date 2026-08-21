import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient.js';
import { findIdBySlug } from '../../lib/slug.js';

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => apiClient.get('/news'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useNewsBySlug(slug) {
  const newsQuery = useNews();
  const id = newsQuery.data ? findIdBySlug(newsQuery.data, slug) : null;

  const detailQuery = useQuery({
    queryKey: ['news', id],
    queryFn: () => apiClient.get(`/news/${id}`),
    enabled: !!id,
    retry: 1,
  });

  const slugNotFound = newsQuery.isSuccess && !id;

  return {
    ...detailQuery,
    isLoading: newsQuery.isLoading || (!!id && detailQuery.isLoading),
    isError: detailQuery.isError || newsQuery.isError || slugNotFound,
  };
}
