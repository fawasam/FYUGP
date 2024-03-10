"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface CollegeState {
  collegeInfo: any;
  success: boolean;
  items: string;
}
const initialState: CollegeState = {
  collegeInfo: [],
  items: "",
  success: false,
};
const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    setCollege: (state, action: PayloadAction<any | null>) => {
      state.collegeInfo = action?.payload?.data?.colleges;
      state.items = action?.payload?.result;
    },
  },
});

export const { setCollege } = collegeSlice.actions;
export default collegeSlice.reducer;
