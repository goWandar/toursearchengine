import { CountrySearchType, ParkSearchType } from "@/types";
import { getFilteredCountries, getFilteredParks } from "@/utils/tourService/textSearchUtils";

const SuggestionBox = ({
  filteredSuggestions,
  handleSelect,
  inputValue,
  isSuggestionSelected,
}: {
  filteredSuggestions: (ParkSearchType | CountrySearchType)[];
  handleSelect: (value: string) => void;
  inputValue: string;
  isSuggestionSelected?: boolean;
}) => {
  // Function to convert string to title case
  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  const parks: ParkSearchType[] = getFilteredParks(filteredSuggestions);
  const countries: CountrySearchType[] = getFilteredCountries(filteredSuggestions);

  const noResults = parks.length === 0 && countries.length === 0;

  return (
    <div>
      {inputValue && !isSuggestionSelected && noResults ? (
        <div className="card mt-1 shadow-sm" style={{ maxWidth: "300px" }}>
          <div className="card-body py-2 px-3">
            <p className="mb-0 text-muted">No tours available around this location yet.</p>
          </div>
        </div>
      ) : inputValue && (parks.length > 0 || countries.length > 0) ? (
        <ul className="list-unstyled mt-1 border rounded shadow-sm bg-white p-2 w-100" style={{ maxWidth: "300px" }}>
          {parks.length > 0 && (
            <>
              <li className="fw-bold px-2 py-1 border-bottom">Parks</li>
              {parks.map((item, idx) => (
                <li
                  key={`park-${idx}`}
                  onClick={() => handleSelect(item.name)}
                  className="px-2 py-1 border-bottom text-capitalize"
                  style={{ cursor: "pointer" }}
                >
                  {toTitleCase(item.name)}
                </li>
              ))}
            </>
          )}
  
          {countries.length > 0 && (
            <>
              <li className="fw-bold px-2 py-1 border-bottom mt-2">Countries</li>
              {countries.map((item, idx) => (
                <li
                  key={`country-${idx}`}
                  onClick={() => handleSelect(item.name)}
                  className="px-2 py-1 border-bottom text-capitalize"
                  style={{ cursor: "pointer" }}
                >
                  {toTitleCase(item.name)}
                </li>
              ))}
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
}

export default SuggestionBox;
