import { create } from "zustand";
import { TimelineData as Timeline } from "@/validation/timeline.validation";

interface TimelineStore {
  timelines: Timeline[];
  setTimelines: (timelines: Timeline[]) => void;
  updateTimeline: (id: string, value: number) => void;
  addTimeline: (timeline: Timeline) => void;
  deleteTimeline: (id: string) => void;
}

export const useTimelineStore = create<TimelineStore>((set) => ({
  timelines: [],
  setTimelines: (timelines) =>
    set((state) => {
      if (JSON.stringify(state.timelines) === JSON.stringify(timelines)) {
        return state;
      }
      return { timelines };
    }),
  updateTimeline: (id, value) =>
    set((state) => ({
      timelines: state.timelines.map((t) =>
        t.id === id ? { ...t, paidValue: value } : t
      ),
    })),
  addTimeline: (timeline) =>
    set((state) => ({
      timelines: [...state.timelines, timeline],
    })),
  deleteTimeline: (id) =>
    set((state) => ({
      timelines: state.timelines.filter((t) => t.id !== id),
    })),
}));
