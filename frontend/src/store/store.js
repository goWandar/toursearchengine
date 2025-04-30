import { BiAddToQueue } from "react-icons/bi";
import { create } from "zustand";

const useStore = create((set) => ({
  tours: [],
  setTours: (tours) => set({ tours }),
  addTours: (tours) =>
    set((state) => ({
      tours: [...state.tours, ...tours],
    })),
}));

export default useStore;
