import { useQuery } from "@tanstack/react-query";
import { searchToursAPI } from "../api/api";

export default function useSearchToursAPI(url) {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["tours-with-filter", url],
    queryFn: () => searchToursAPI(url),
    enabled: false,
  });

  // const showMoreTours = useQuery({
  //   queryKey: ["tours-with-filter-cursor"],
  //   queryFn: () => searchToursAPI(url),
  //   enabled: false,
  // });

  return { isPending, data, refetch, error };

  // return { searchTours, showMoreTours };
}
