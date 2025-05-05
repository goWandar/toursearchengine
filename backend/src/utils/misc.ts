import { Tour } from "../types/types";
type Filters = {
  location: string | undefined;
  daysMin: number | undefined;
  daysMax: number | undefined;
};

function applyFilters(filters: Filters, tours: Tour[]): Tour[] {
  let filteredTours: Tour[] = tours;

  const { location, daysMax, daysMin } = filters;

  // FOR DEBUGGING
  // console.log("before filter", filteredTours.length);

  if (location !== undefined) {
    filteredTours = filteredTours.filter((tour) => {
      const locationArray = tour.location.toLowerCase().split(", ");
      return locationArray.includes(location.toLowerCase());
    });
  }

  if (daysMin !== undefined && daysMax !== undefined) {
    filteredTours = filteredTours.filter((tours) => {
      return tours.durationInDays >= daysMin && tours.durationInDays <= daysMax;
    });
  }
  // FOR DEBUGGING
  // console.log("after filter", filteredTours.length);

  return filteredTours;
}
