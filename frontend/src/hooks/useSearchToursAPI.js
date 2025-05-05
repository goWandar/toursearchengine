import { useQuery } from "@tanstack/react-query";
import { searchToursAPI } from "../api/api";

export default function useSearchToursAPI(url) {
  return useQuery({
    queryKey: ["tours-with-filter", url],
    queryFn: () => searchToursAPI(url),
    enabled: false,
  });
}
