import { useQuery } from "@tanstack/react-query";
import { searchTours } from "../api/api";

function useToursWithFilter(url: string) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tours-with-filter"],
    queryFn: () => searchTours(url),
    enabled: !!url,
  });

  return { isPending, isError, data, error };
}

export { useToursWithFilter };
