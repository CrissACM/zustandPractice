import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createDateSlice, DateSlice } from "./date.slice";
import { createGuestSlice, type GuestSlice } from "./guest.slice";
import { createPersonSlice, type PersonSlice } from "./person.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
  })),
);
