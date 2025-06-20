import { Country, Park } from '@/utils/tourService/textSearchUtils';

const SuggestionBox = ({
    filteredSuggestions,
    handleSelect,
    inputValue,
}: {
    filteredSuggestions: (Park | Country)[];
    handleSelect: (value: string) => void;
    inputValue: string;
}
) => {
    const toTitleCase = (str: string) =>
        str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return (
    <div>
        {inputValue && filteredSuggestions.length > 0 && (
        <ul style={{
          listStyle: "none",
          padding: 0,
          marginTop: "4px",
          border: "1px solid #ccc",
          maxHeight: "150px",
          overflowY: "auto",
          width: "300px",
          background: "#fff"
        }}>
          {filteredSuggestions.map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => handleSelect(item.name as string)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee"
                }}
              >
                {toTitleCase(item.name as string)}
              </li>
            );
          })}
        </ul>
        )}
    </div>
  )
}

export default SuggestionBox