import { useEffect, useState } from "react";
import { useTourStore, useTextSearchStore } from "@/store/store";
import { TbLoader2 } from "react-icons/tb";
import { Tour } from "@/types";
import { fetchToursHandler } from "@/utils/tourService/textSearchUtils";

const TextSearchResults = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const type = urlParams.get("type") as "country" | "park" | null;

  const selectedId = useTextSearchStore((s) => s.selectedSuggestionId);
  const selectedType = useTextSearchStore((s) => s.selectedSuggestionType);
  const setSelectedId = useTextSearchStore((s) => s.setSelectedSuggestionId);
  const setSelectedType = useTextSearchStore((s) => s.setSelectedSuggestionType);
  const resetSelectedSuggestion = useTextSearchStore((s) => s.resetSelectedSuggestion);

  const tours = useTourStore((s) => s.tours);
  const setTours = useTourStore((s) => s.setTours);
  const addTours = useTourStore((s) => s.addTours);
  const pagination = useTourStore((s) => s.pagination);
  const setPagination = useTourStore((s) => s.setPagination);
  const resetTours = useTourStore((s) => s.resetTours);

  const [loading, setLoading] = useState(false);

  // Initial Tour Fetch
  useEffect(() => {
    fetchToursHandler({
      id,type,page: 1,limit: pagination.limit,
      append: false,setLoading,setTours,addTours,
      setPagination,resetTours,selectedId,selectedType,
      setSelectedId,setSelectedType,resetSelectedSuggestion,
    });
  }, []);

  // Fetch on Load More
  const loadMore = async () => {
    await fetchToursHandler({
      id,type,page: pagination.page + 1,limit: pagination.limit,
      append: true,setLoading,setTours,addTours,setPagination,
      resetTours,selectedId,selectedType,setSelectedId,
      setSelectedType,resetSelectedSuggestion,
    });
  };

  return (
    <div className="container py-4">
      {tours.length > 0 ? (
        <>
          <h2 className="h4 mb-4">Search Results</h2>
          <div className="row">
            {tours.map((tour: Tour) => (
              <div key={tour.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{tour.title}</h5>
                    <p className="card-text mb-1">
                      <strong>Accommodation:</strong> {tour.accommodationType}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Country:</strong> {tour.country?.name}
                    </p>
                    <p className="card-text">
                      <strong>Operator:</strong> {tour.operator?.name}
                    </p>
                    {tour.siteURL && (
                      <a
                        href={tour.siteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm mt-2"
                      >
                        View Tour
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination.hasMore && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "10rem" }}>
          <TbLoader2 className="spinner-border text-secondary" />
        </div>
      )}
    </div>
  );
};

export default TextSearchResults;
