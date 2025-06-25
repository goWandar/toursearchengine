import { getToursByCountryId, getToursByParkId } from "@/api/api";
import { useTextSearchStore, useTourStore } from "@/store/store"
import { Tour } from "@/types";
import { useEffect} from "react";
import { TbLoader2 } from "react-icons/tb";

const TextSearchResults = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const type = urlParams.get('type') as 'country' | 'park' | null;

  // Manage Selected Suggestion State
  const selectedId = useTextSearchStore((state) => state.selectedSuggestionId);
  const selectedType = useTextSearchStore((state) => state.selectedSuggestionType);
  const setSelectedId = useTextSearchStore((state) => state.setSelectedSuggestionId);
  const setSelectedType = useTextSearchStore((state) => state.setSelectedSuggestionType);
  const resetSelectedSuggestion = useTextSearchStore((state) => state.resetSelectedSuggestion);


  // Manage Tours State
  const tours = useTourStore((state) => state.tours);
  const setTours = useTourStore((state) => state.setTours);
  const pagination = useTourStore((state) => state.pagination);
  const setPagination = useTourStore((state) => state.setPagination);
  const resetTours = useTourStore((state) => state.resetTours);

  useEffect(() => {
    const fetchTours = async () => {
      if (!id || !type) return;

      const idNum = Number(id);

      
      // Avoid db fetch if the tours already in state
      if (idNum === selectedId && type === selectedType) {
        return;
      }

      //Reset states before fetching
      resetSelectedSuggestion();
      resetTours();

      if (type === 'country') {
        const tourData = await getToursByCountryId(idNum, pagination.page, pagination.limit);
        setTours(tourData.tours);
        setPagination(tourData.pagination);
      }

      if (type === 'park') {
        const tourData = await getToursByParkId(idNum, pagination.page, pagination.limit);
        setTours(tourData.tours);
        setPagination(tourData.pagination);
      }

      setSelectedId(idNum);
      setSelectedType(type);
    };

    fetchTours();
  }, []);


  return (
    <div>
      {
        tours.length > 0 ? (
          <div className="text-search-results">
            <h2 className="text-lg font-semibold mb-4">Search Results</h2>
            <ul className="space-y-4">
              {tours.map((tour: Tour) => (
                <li key={tour.id} className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <h3 className="text-xl font-bold">{tour.title}</h3>
                  <p>{tour.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <TbLoader2/>
        )
      }
    </div>
  )
}

export default TextSearchResults