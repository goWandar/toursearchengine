import { create } from 'zustand';
import type { Tour } from '@/types/index';

interface StoreState {
  tours: Tour[];
  cursor: number;
  setTours: (tours: Tour[]) => void;
  addTours: (tours: Tour[]) => void;
  setCursor: (value: number) => void;
  resetCursor: () => void;
}

const useStore = create<StoreState>((set) => ({
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

export default useStore;
