import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { searchToursAPI } from '@/api/api.js';
import type { SearchResponse } from '@/api/api.js';

export default function useSearchToursAPI(url: string): UseQueryResult<SearchResponse, Error> {
  return useQuery({
    queryKey: ['tours-with-filter', url],
    queryFn: () => searchToursAPI(url),
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
