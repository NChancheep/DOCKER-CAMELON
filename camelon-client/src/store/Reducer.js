import { createSlice } from "@reduxjs/toolkit";
import { news } from "./data/news";
import { locations } from "./data/locations";
import { news_info } from "./data/news_info";
import { provinces } from "./data/provinces";
import { districts } from "./data/districts";
import { subdistricts } from "./data/subdistricts";
import { thailandGeoJson } from "./data/thailand";
const initialState = {
  news: news,
  news_info: news_info,
  locations: locations,
  provinces: provinces,
  districts: districts,
  subdistricts: subdistricts,
  user_current_location: { latitude: 13.751, longitude: 100.492 },
  thailandGeoJson: thailandGeoJson,
  selectedMonths: [
    { name: "ม.ค.", number: "01", isSelected: true },
    { name: "ก.พ.", number: "02", isSelected: true },
    { name: "มี.ค.", number: "03", isSelected: true },
    { name: "เม.ย.", number: "04", isSelected: true },
    { name: "พ.ค.", number: "05", isSelected: true },
    { name: "มิ.ย.", number: "06", isSelected: true },
    { name: "ก.ค.", number: "07", isSelected: true },
    { name: "ส.ค.", number: "08", isSelected: true },
    { name: "ก.ย.", number: "09", isSelected: true },
    { name: "ต.ค.", number: "10", isSelected: true },
    { name: "พ.ย.", number: "11", isSelected: true },
    { name: "ธ.ค.", number: "12", isSelected: true },
  ],
  selectedYear: "",

};

const camelonSlice = createSlice({
  name: "newsLocationList",
  initialState,
  reducers: {
    change_current_location: (state, action) => {
      state.user_current_location = action.payload;
    },
    change_selected_months: (state, action) => {
      state.selectedMonths = action.payload;
    },
    change_selected_year: (state, action) => {
        state.selectedYear = action.payload;
    }
  },
});

export const { change_current_location } = camelonSlice.actions;
export const { change_selected_months } = camelonSlice.actions;
export const { change_selected_year } = camelonSlice.actions;
export default camelonSlice.reducer;
