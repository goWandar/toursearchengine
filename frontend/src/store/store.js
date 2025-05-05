import { create } from "zustand";

// const useStore = create((set) => ({
//   tours: [],
//   setTours: (tours) => set({ tours }),
//   addTours: (tours) =>
//     set((state) => ({
//       tours: [...state.tours, ...tours],
//     })),
// }));

// export default useStore;
const useStore = create((set) => ({
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
