import { create } from "zustand";

const useStore = create((set) => ({
  tours: [],
  setTours: (tours) => set({ tours }),
}));

export default useStore;
