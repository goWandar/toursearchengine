import type { Tour } from '@/types/index';
import { create } from 'zustand';

interface StoreState {
  tours: Tour[];
  cursor: number;
  setTours: (tours: Tour[]) => void;
  addTours: (tours: Tour[]) => void;
  setCursor: (value: number) => void;
  resetCursor: () => void;
}

export const useStore = create<StoreState>((set) => ({
  tours: [],
  cursor: 0,

  setTours: (tours) => set({ tours }),
  addTours: (tours) =>
    set((state) => ({
      tours: [...state.tours, ...tours],
    })),

  setCursor: (value) => set({ cursor: value }),
  resetCursor: () => set({ cursor: 0 }),
}));

interface TextSearchStore {
  selectedSuggestionId: number | null,
  selectedSuggestionType: 'park' | 'country' | null,

  setSelectedSuggestionId: (id: TextSearchStore["selectedSuggestionId"]) => void,
  setSelectedSuggestionType: (type: TextSearchStore["selectedSuggestionType"]) => void,

  resetSelectedSuggestion: () => void,
}

export const useTextSearchStore = create<TextSearchStore>((set) => ({
  selectedSuggestionId: null,
  selectedSuggestionType: null,

  setSelectedSuggestionId: (id) => set({
    selectedSuggestionId: id,
  }),
  setSelectedSuggestionType: (type) => set({
    selectedSuggestionType: type,
  }),

  resetSelectedSuggestion: () => set({
    selectedSuggestionId: null,
    selectedSuggestionType: null,
  })
}))

interface TourStore {
  tours: Tour[];
  setTours: (tours: Tour[]) => void;
  addTours: (tours: Tour[]) => void;
  

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  setPagination: (pagination: TourStore["pagination"]) => void;

  resetTours: () => void;
}

export const useTourStore = create<TourStore>((set) => ({
  tours: [],
  setTours: (tours) => set({ tours }),
  addTours: (tours) =>
    set((state) => ({
      tours: [...state.tours, ...tours],
    })),

  pagination: {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
    hasMore: true,
  },
  setPagination: (pagination) => set({ pagination }),
  
  resetTours: () => set({
    tours: [],
    pagination: {
      page: 1,
      limit: 8,
      total: 0,
      totalPages: 0,
      hasMore: true,
    },
  }),
}));