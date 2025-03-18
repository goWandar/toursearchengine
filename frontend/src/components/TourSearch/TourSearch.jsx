import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput.jsx";
import "../../assets/_tourSearch.scss";
import { Tour } from "../../types/types.ts";
import { getTours } from "../../api/api.ts";
import { GetToursResponse } from "../../api/api.ts";

const TourSearch = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [openInput, setOpenInput] = useState<string | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-input")) {
        setOpenInput(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    console.log({
      location,
      type,
      days,
      budget,
      selectedOption,
    });
  };

  const daysOptions = ["Any", "1 - 5", "6 - 10", "10 - 15", "15+"];

  const handleDaysSelect = (selectedDays) => {
    setDays(selectedDays);
    setOpenInput(null);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  return (
    <div className="tour-search-container">
      <nav className="tour-search-navbar">
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </nav>
      <div className="tour-search-content">
        <h1>Tour Search</h1>
        <div className="search-inputs-row">
          <SearchInput
            placeholder="Where to"
            options={[
              "Anywhere",
              "South Africa",
              "Tanzania",
              "Botswana",
              "Kenya",
            ]}
            onSelect={setLocation}
            isOpen={openInput === "location"}
            setIsOpen={setOpenInput}
            inputName="location"
          />
          <SearchInput
            placeholder="Type"
            options={["Luxury", "Mid-range", "Budget"]}
            onSelect={setType}
            isOpen={openInput === "type"}
            setIsOpen={setOpenInput}
            inputName="type"
          />
          <div className={`days-input-container search-input`}>
            <div
              className={`input-container ${!days ? "placeholder" : ""}`}
              onClick={() => setOpenInput("days")}
            >
              {days || "Days"}
            </div>
            {openInput === "days" && (
              <ul className="options-list">
                {daysOptions.map((option) => (
                  <li key={option} onClick={() => handleDaysSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SearchInput
            placeholder="Budget"
            options={[
              "0 - $499",
              "$500 - $1499",
              "$1500 - $2999",
              "$3000 - $4999",
              "$5000+",
            ]}
            onSelect={setBudget}
            isOpen={openInput === "budget"}
            setIsOpen={setOpenInput}
            inputName="budget"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="checkboxes-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedOption === "lodge"}
              onChange={() => handleOptionChange("lodge")}
            />
            Lodge
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedOption === "camp"}
              onChange={() => handleOptionChange("camp")}
            />
            Camp
          </label>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TourSearch;
