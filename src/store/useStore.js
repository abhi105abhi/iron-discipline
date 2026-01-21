import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  habits: [],
  isPremium: false,
  loading: true,
  
  setUser: (user) => set({ user }),
  setHabits: (habits) => set({ habits }),
  setPremium: (status) => set({ isPremium: status }),
  setLoading: (status) => set({ loading: status }),
  
  logout: () => set({ user: null, habits: [], isPremium: false, loading: false })
}));
