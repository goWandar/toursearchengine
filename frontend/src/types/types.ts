export type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type Filters = {
  location: string;
  accommodationType: string;
  days: string;
  budget: string;
  safariType: string;
};
