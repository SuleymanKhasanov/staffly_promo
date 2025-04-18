import { create } from 'zustand';

interface ScrollState {
  scrollProgress: number;
  thirdSectionProgress: number;
  section: 'first' | 'second' | 'third';
  imacRotationProgress: number;
  isAnimationComplete: boolean;
  setScrollProgress: (progress: number) => void;
  setThirdSectionProgress: (progress: number) => void;
  setSection: (section: 'first' | 'second' | 'third') => void;
  setImacRotationProgress: (progress: number) => void;
  setAnimationComplete: (complete: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  thirdSectionProgress: 0,
  section: 'first',
  imacRotationProgress: 0,
  isAnimationComplete: false,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setThirdSectionProgress: (progress) =>
    set({ thirdSectionProgress: progress }),
  setSection: (section) =>
    set({
      section,
      scrollProgress: 0,
      thirdSectionProgress: 0,
      isAnimationComplete: false,
    }),
  setImacRotationProgress: (progress) =>
    set({ imacRotationProgress: progress }),
  setAnimationComplete: (complete) =>
    set({ isAnimationComplete: complete }),
}));
