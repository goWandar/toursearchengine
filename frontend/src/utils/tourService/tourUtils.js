const baseUrl = import.meta.env.VITE_BASE_URL;

export function createUrlwithFilter(filters, cursor) {
  let url = `${baseUrl}/api/tours/?`;
  let daysMin, daysMax, priceMin, priceMax;

  const { location, accommodationType, days, budget, safariType } = filters;
  if (days !== "") {
    const daysArray = days.split("-").map((value) => value.trim());
    daysMin = daysArray[0];
    daysMax = daysArray[1];
  }
  if (budget !== "") {
    const budgetArray = budget
      .replaceAll("$", "")
      .split("-")
      .map((value) => value.trim());
    priceMin = budgetArray[0];
    priceMax = budgetArray[1];
  }

  if (location !== "") url += `&location=${encodeURIComponent(location)}`;
  if (days !== "") url += `&daysMin=${daysMin}&daysMax=${daysMax}`;
  if (budget !== "") url += `&priceMin=${priceMin}&priceMax=${priceMax}`;
  if (accommodationType !== "")
    url += `&accomodationType=${encodeURIComponent(accommodationType)}`;
  if (safariType !== "") url += `&safariType=${encodeURIComponent(safariType)}`;

  if (cursor) url += `&cursor=${cursor}`;

  return url;
}
