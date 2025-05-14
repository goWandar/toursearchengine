interface TourFilters {
  location: string;
  accommodationType: string;
  days: string;
  budget: string;
  safariType: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export function createUrlwithFilter(filters: TourFilters, cursor?: number): string {
  let url = `${baseUrl}/api/tours/?`;
  let daysMin: string | undefined;
  let daysMax: string | undefined;
  let priceMin: string | undefined;
  let priceMax: string | undefined;

  const { location, accommodationType, days, budget, safariType } = filters;

  if (days !== '') {
    const daysArray = days.split('-').map((value) => value.trim());
    daysMin = daysArray[0];
    daysMax = daysArray[1];
  }

  if (budget !== '') {
    const budgetArray = budget
      .replaceAll('$', '')
      .split('-')
      .map((value) => value.trim());
    priceMin = budgetArray[0];
    priceMax = budgetArray[1];
  }

  if (location !== '') url += `&location=${encodeURIComponent(location)}`;
  if (days !== '') url += `&daysMin=${daysMin}&daysMax=${daysMax}`;
  if (budget !== '') url += `&priceMin=${priceMin}&priceMax=${priceMax}`;
  if (accommodationType !== '') url += `&accomodationType=${encodeURIComponent(accommodationType)}`;
  if (safariType !== '') url += `&safariType=${encodeURIComponent(safariType)}`;

  if (cursor && cursor > 0) url += `&cursor=${cursor}`;

  return url;
}
