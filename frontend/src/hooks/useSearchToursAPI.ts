import { searchToursAPI } from '@/api/api';
import { SearchResponse } from '@/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export default function useSearchToursAPI(url: string): UseQueryResult<SearchResponse, Error> {
  return useQuery({
    queryKey: ['tours-with-filter', url],
    queryFn: () => searchToursAPI(url),
    enabled: false,
  });
}
